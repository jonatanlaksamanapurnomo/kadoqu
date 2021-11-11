import gql from 'graphql-tag';

const addSurveyLog = gql`
  mutation addSurveyLog {
    addSurveyLog
  }
`;

const checkSurveyLog = gql`
  query checkSurveyLog {
    checkSurveyLog
  }
`;
const deleteSurveyLog = gql`
  mutation deleteSurveyLog {
    deleteSurveyLog
  }
`;

export { addSurveyLog, checkSurveyLog, deleteSurveyLog };
