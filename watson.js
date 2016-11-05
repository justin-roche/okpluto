var util = require('./util.js');
var watson = require('watson-developer-cloud/personality-insights/v3');

 var personality_insights = new watson({
 username: "409fa6ad-3ebd-4b85-8165-0ae25b669d09",
 password: "P5UhTF2zcKst",
 version_date: "2016-10-20"
});

// var params = {
//   text: ``,
//   consumption_preferences: false,
//   raw_scores: false,
//   headers: {
//     'accept-language': 'en',
//     'accept': 'text/plain'
//   }
// };

// personality_insights.profile(params, (error, response) => {
//   if (error) {
//     console.log('ERROR: ', error);
//   } else {
//     console.log(JSON.stringify(response, null, 2));
//   }
// });

module.exports = {
  personality_insights: personality_insights,
  profile: personality_insights.profile
};


