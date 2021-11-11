import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Image } from "react-bootstrap";
import "./Career.css";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import IMAGES from "../data/images";
import ReactMarkdown from 'react-markdown';




class CareerDetail extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      banner: this.props.match.params.id
    };
  }


  

  render() {

    const id = this.props.match.params.id;
    const jobDetail = {
      "JobReq": {
        SE:"<ul> <li> BSc degree in Computer Science, Informatics, Engineering, or relevant field </li> <li> Proven work minimum 2 years experience as a Software Engineer or Software Developer </li> <li> Able to work within a team and use collaborative tools such as Github, Slack, etc. </li> <li> Deep understanding of Web Applications and programming languages such as HTML, CSS, Javascript, PHP, JQuery, and APIs. </li> <li> Deep understanding of SDLC, UI/UX, cross browser compatibility, general web functions and standard </li><li>Problem solver, fast learner, self-initiative, good analytical thinking, a team-player </li> <li> Show a strong leadership quality and startup spirit</li></ul>",
        OF:"<ul> <li> Diploma / Bachelor Degree at any field Maximum 28 years old </li><li> Minimum 2 year experience of work (in Customer Service and Gift Wrapping will is priority) </li><li> Openness to learn, willingness to try anything, a team-player </li><li> Good wrapping skills & quality focus </li><li> Great communication, phone skills, and listening skills </li><li> A self-starter who is comfortable with both taking initiative and working in collaboration </li><li> Positive attitude, detail and customer oriented with good multitasking and good at resolving conflict</li> </ul>",
        BD:"<ul> <li> BSc degree in Business, Marketing, Communication or relevant field </li><li>  Minimum 2 year experience in business development, public relations, sales.</li><li> Flexibility to deal with anyone inside and outside of the organization </li><li> Great communication and negotiation skills </li><li> The ability to travel to meet clients, attend conferences and research new markets as needed </li><li> Positive attitude, detail and customer oriented with good multitasking and organizational ability </li></ul>",
        DM:"<ul> <li> BSc degree in Marketing, Design, Communication or relevant field </li><li> A kind of positive Netizen and exist with influencing content </li><li> A self-starter who is comfortable with both taking initiative and working in collaboration </li><li> Design skills will be beneficial </li><li> Excellent oral and written communication skills Knowledge of Facebook, Twitter, Instagram, YouTube, Google, Line@. </li><li> Experience with social media analytics, including Google Analytics, Instagram Insight, Facebook Insights </li><li> Knowledge of SEO, keyword research and Web Traffic Metrics</li></ul>"
      , PD:"<ul> <li> BSc degree in Graphic Design, Product Design, or relevant field. </li><li> Proven experience in graphic design role with portofolio of design projects.</li><li> Passion & enthusiasm for design, with a creative flair. A flexible approach when working in a team. </li><li> Have an eye for color & shape and be able to translate requirements into practical product freatures. </li><li> Capable to build products that are easy to use and visually appealing to our potential customers. </li><li> Time management skills and the ability to cope with several projects at a time. </li><li> An understanding of the latest trends and their role within a commercial environment. </li><li> Being open to feedback and willing to make changes to yout designs. </li><li> Only strong portfolio will be processed</li></ul>"
    ,SMS:"<ul><li> Basic in Marketing Design, Communication or relevant field </li> <li> Proven working experience in sosial media marketing or as a digital media specialist </li><li> Design skill will be beneficial </li> <li> Excellent oral and written communication skills </li> <li> Knowledge of Facebook, Twitter, Instagram, Youtube, Google, Line@ </li> <li> Experience with social media analytics, including Google Analytics </li> <li> Instagram Insight, Facebook Insight </li> <li> Solid knowledge of SEO, keyword research and Web traffic metrics </li> <li> Experience in business development, create and manage partnership with external entity </li> <li> must be creative up to date and strategic thinker </li> <li> Show a string leadership quality and startup sprint </li> </ul>"}, 
      
      "JobDesc":{
        SE:"<ul> - Determines operational feasibility by evaluating analysis, problem definition, requirements, solution development, and proposed solutions.<br></br>- Documents and demonstrates solutions by developing documentation, flowcharts, layouts,diagrams, charts, code comments and clear code. <br></br> -Prepares and installs solutions by determining and designing system specifications, standards, and programming.<br></br> - Improves operations by conducting systems analysis; recommending changes in policies and procedures.<br></br>- Protects operations by keeping information confidential. <br></br>- Develop and integrate software components into a fully functional software system <br></br>-Develop software verification plans and quality assurance procedures <br></br> - Troubleshoot, debug and upgrade existing systems <br></br>- Deploy programs and evaluate user feedback <br></br> - Comply with project plans and industry standards <br></br>- Ensure software is updated with latest features <br></br> - Mentors Junior Engineer and inspire teamwork <br></br> - Takes ownership and can work autonomously on any development task within an application orservice, delivering code on time and with a quality mindset. <br></br> - Mastering ability to break down tasks,plan, estimate, and cut scope to ship on time. Prioritizes in alignment with company goals </ul>",
        OF:"<ul> - Responsible for order fulfillment include gift wrapping and customer support. <br></br> - Serves customers by providing product and service information and resolving product and service problems. <br></br> - Attracts potential customers by answering product and service questions; suggesting information about other products and services. <br></br> - Wraps and decorates customer's purchases with gift-wrapping paper, ribbons, bows, and tape <br></br> - Providing feedback on the efficiency of the order fulfillment process. <br></br> - Ensure customer satisfaction and provide professional customer support <br></br> - Maintaining a positive, empathetic and professional attitude toward customers at all times. <br></br> - Communicating with customers through various channels. <br></br> - Keeping records of customer interactions, transactions, comments and complaints. <br></br> - Recommends potential products or services to management by collecting customer information and analyzing customer needs. <ul>",
        BD:"<ul> - Identify, acquire, and manage merchant partnership <br></br> - Develop and deliver pitches for potential merchant partner <br></br> - Ensure a deep knowledge of the platform environment to ensure full merchant understanding of Kadoqu.com value proposition <br></br> - Develop a growth strategy focused both on financial gain and customer satisfaction <br></br> - Conduct research to identify new markets and customer needs <br></br> - Promote the company’s products/services addressing or predicting clients’ objectives <br></br> - Prepare & organize partnership contracts ensuring adherence to law-established rules and guidelines <br></br> - Provide trustworthy relationship and feedback. <br></br> - Coordinate and closely collaborate with other departments to find out sales leads <br></br> - Work closely with the marketing, sales and product teams to create and implement new business strategies <br></br> - Create and manage event to increase merchant and/or customer engagement <br></br> - Stay up-to-date with current trends in gift market and make any possible idea to improve sales. <ul>",
         DM:"<ul> - Perform research on current benchmark trends and audience preferences <br></br> - Plan, schedule, and implement social media strategy & program to align with business goals. <br></br>  - Set specific objectives and report on ROI <br></br> - Generate social media engaging content daily (e.g. original text, photos, videos and news) <br></br> - Develop content calendars on a weekly and monthly basis for company brands. -<br></br> - Monitor analytics with social media team to identify viable ideas. <br></br> - Communicate with followers, respond to queries in a timely manner and monitor customer reviews <br></br> - Stay up-to-date with current technologies and trends in social media, design tools and applications <br></br> - Develop monthly reports on emerging social media trends that will be submitted to the management and executive teams. <br></br> - Seek opportunities for partnerships, sponsorships and advertising with stakeholder, media and public.<ul>"
     ,PD:" ", SMS : "<ul> - Produce new ideas & design for company branding, promotional campaigns, and marketing communications.	<br/> -Plan, design, schedule, and generate social media engaging content & program to align with business goals.<br/>	-	Set specific objectives and report on ROI for digital marketing effort.	<br/> - Monitor & report digital marketing, social media analytics. <br/> - Communicate with followers, respond to queries in a timely manner and monitor customer reviews. <br/> - Perform research on current benchmark trends and audience preferences.	<br/> - Stay up-to-date with current technologies and trends in marketing and social media, design tools and applications. <br/> - Create and manage partnerships, sponsorships and advertising with merchant and other stakeholder.	</ul>     " },
      "Position" :{
         SE:"Full Time",
        OF:"Full Time",
      BD:"Full Time",
      DM:"Full Time",
      PD:"Part Time",
    SMS :"Full Time"}
    };


    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          const isMobile = !isDesktop;
          return (
            <React.Fragment>
              <Helmet>
                <title>Kadoqu.com | Career Details</title>
              </Helmet>
              <Image
                className="career-banner"
                fluid
                src={IMAGES.Career[id]}
                alt="Career Banner"
              />
              {/* <div
                className={
                  isMobile
                    ? "kadoqu-page-title career-detail-desc-mob"
                    : "kadoqu-page-title career-detail-desc"
                }
              >
                Full Time
              </div> */}
              <div className="career-detail-desc-bg"></div>
              <div className="career-detail-desc-bgwhite">
                <div
                  className={
                    isMobile
                      ? "kadoqu-page-title job-title-hire-mob"
                      : "kadoqu-page-title job-title-hire"
                  }
                >
                  <div className={
                  isMobile
                    ? "kadoqu-page-title career-detail-desc-mob"
                    : "kadoqu-page-title career-detail-desc"} >                  <ReactMarkdown source={`${jobDetail.Position[id]}`} />   
                    </div> Min 6 months experience in relevant field for this position
                  <a href="http://bit.ly/kadoqucareer">
                    <button
                      type="submit"
                      className={
                        isMobile
                          ? "kadoqu-primary-button apply-button-mob"
                          : "kadoqu-primary-button apply-button"
                      }
                      // {
                      //   isMobile
                      //     ? "kadoqu-primary-button-green CompanyCelebration-contactus-button-mob"
                      //     : "kadoqu-primary-button-green MagicalMoment-contactus-button"
                      // }
                    >
                      Apply
                    </button>
                  </a>
                </div>
                <div className="Job-Requirements"></div>
              </div>
              <div className="career-detail-desc-bgwhite">
                <div
                  className={
                    isMobile
                      ? "kadoqu-page-title job-title"
                      : "kadoqu-page-title job-title"
                  }
                >
                  Job Requirements{" "}
             </div>
                <div className="Job-Requirements">
                <ReactMarkdown   escapeHtml={false}
 source={`${jobDetail.JobReq[id]}`}/>   
                  {/* -BSc degree in Computer Science, Informatics, Engineering, or
                  relevant field Proven work minimum 2 years experience as a
                  Software Engineer or Software Developer <br></br> <br></br>
                  -Able to work within a team and use collaborative tools such
                  as Github, Slack, etc.<br></br> <br></br>- Deep understanding
                  of Web Applications and programming languages such as HTML,
                  CSS, Javascript, PHP, JQuery, and APIs.<br></br> <br></br>-
                  Deep understanding of SDLC, UI/UX, cross browser
                  compatibility, general web functions and standard Problem
                  solver, fast learner, self-initiative, good analytical
                  thinking, a team-player Show a strong leadership quality and
                  startup spirit. */}
                </div>
              </div>
              <div className="career-detail-desc-bgwhite">
                <div
                  className={
                    isMobile
                      ? "kadoqu-page-title job-title"
                      : "kadoqu-page-title job-title"
                  }
                >
                  Job Description{" "}
                </div>
                <div className="Job-Requirements">
                  <ReactMarkdown   escapeHtml={false} source={`${jobDetail.JobDesc[id]}`} /> 
                  {/* - Determines operational feasibility by evaluating analysis,
                  problem definition, requirements, solution development, and
                  proposed solutions.<br></br> <br></br>- Documents and
                  demonstrates solutions by developing documentation,
                  flowcharts, layouts, diagrams, charts, code comments and clear
                  code.<br></br> <br></br>- Prepares and installs solutions by
                  determining and designing system specifications, standards,
                  and programming.<br></br> <br></br>- Improves operations by
                  conducting systems analysis; recommending changes in policies
                  and procedures.<br></br> <br></br>- Protects operations by
                  keeping information confidential. <br></br> <br></br>- Develop
                  and integrate software components into a fully functional
                  software system <br></br> <br></br>- Develop software
                  verification plans and quality assurance procedures <br></br>{" "}
                  <br></br>- Troubleshoot, debug and upgrade existing systems
                  <br></br> <br></br>- Deploy programs and evaluate user
                  feedback <br></br> <br></br>- Comply with project plans and
                  industry standards <br></br> <br></br>- Ensure software is
                  updated with latest features <br></br> <br></br>- Mentors
                  Junior Engineer and inspire teamwork <br></br> <br></br>-
                  Takes ownership and can work autonomously on any development
                  task within an application or service, delivering code on time
                  and with a quality mindset. <br></br> <br></br>- Mastering
                  ability to break down tasks, plan, estimate, and cut scope to
                  ship on time. Prioritizes in alignment with company goals. */}
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </MediaQuery>
    );
  }
}

export default CareerDetail;
