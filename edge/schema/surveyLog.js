const { db } = require('../db');

const monthsInRange = (start, end) => {
  let months;
  months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth() + 1;
  return months <= 0 ? 0 : months;
};
const typeDefs = `
  type SurveyLog {
    id: String
    guestId: String
    userId: String
    person: String
    event: String
    traits: String
  }

  input SurveyLogInput {
    guestId: String
    person: String
    event: String
    traits: String
  }

  extend type Query {
    getSurveyLogs: [SurveyLog]
    checkSurveyLog: Boolean
    SurveyCount (startDate: ParsedDateInput, endDate: ParsedDateInput,): [Int]
    getSurvey : [SurveyLog]
  }

  extend type Mutation {
    addSurveyLog(input: SurveyLogInput): Boolean
    updateSurveyLogUserId(guestId: String): Boolean
    deleteSurveyLog: Boolean
  }
`;

const fieldNameMapper = surveyLog => ({
  id: surveyLog.id,
  guestId: surveyLog.guest_id,
  userId: surveyLog.user_id,
  person: surveyLog.person,
  event: surveyLog.event,
  traits: surveyLog.traits
});

const resolvers = {
  Query: {
    getSurveyLogs: () =>
      db
        .any('SELECT * FROM survey_log')
        .then(surveyLogs => surveyLogs.map(fieldNameMapper))
        ,  
    SurveyCount:(
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT COUNT(DATE_TRUNC('month', survey_log.created_at)), DATE_TRUNC('month', survey_log.created_at) AS create_date" +
            " FROM survey_log" +
            " WHERE survey_log.created_at >= $1 AND survey_log.created_at <= $2" +
            " GROUP BY create_date" +
            " ORDER BY create_date",
          [start, end]
        )
        .then(response => {
          let survey = new Array(countRequestedMonths).fill(0);
          if (response.length === 0) {
            return survey;
          }
          let resIterator = 0;
          for (let i = 0; i < countRequestedMonths; i++) {
            if (!response[resIterator]) {
              break;
            }
            if (
              monthsInRange(
                start,
                new Date(response[resIterator].create_date)
              ) !==
              i + 1
            ) {
              continue;
            }
            survey[i] = response[resIterator].count;
            resIterator++;
          }
          return survey;
        });
    },
    getSurvey: () => {
      return db
        .any("SELECT * FROM survey_log")
        .then(survey => survey.map(fieldNameMapper));
    },
    checkSurveyLog: (_, __, context) =>
      db
        .one('SELECT * FROM survey_log WHERE user_id = $1', [context.user.data])
        .then(res => true)
        .catch(e => {
          throw new Error(e.message);
        })
  },

  Mutation: {
    addSurveyLog: (_, { input }, context) =>
      db
        .none(
          'INSERT INTO survey_log (guest_id, user_id, person, event, traits) VALUES ($1, $2, $3, $4, $5)',
          [
            input.guestId,
            context.user != undefined ? context.user.data : null,
            input.person,
            input.event,
            input.traits
          ]
        )
        .then(() => true)
        .catch(e => {
          throw new Error(e.message);
        }),
    updateSurveyLogUserId: (_, { guestId }, context) =>
      db
        .none(
          `
          UPDATE survey_log SET
            user_id = $1
          WHERE user_id IS NULL AND
            guest_id = $2
          `,
          [context.user.data, guestId]
        )
        .then(() => true)
        .catch(e => {
          throw new Error(e.message);
        }),
    deleteSurveyLog: (_, __, context) =>
      db
        .none('DELETE FROM survey_log WHERE user_id = $1', [context.user.data])
        .then(() => true)
        .catch(e => {
          throw new Error(e.message);
        })
  }
};

module.exports = {
  typeDefs,
  resolvers
};
