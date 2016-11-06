const authPath = require('./config/auth0');
const request = require('request');
const User = require('./app/models/users');
const watson = require('watson-developer-cloud/personality-insights/v3');
const personality_insights = new watson(require("./config/api").WATSON);

const getUserAccessKeys = function(userId) {
    let oAuthUrl = `https://${authPath.AUTH0_DOMAIN}/oauth/token`;

    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            url: oAuthUrl,
            headers: { 'content-type': 'application/json' },
            body: `{
                "client_id":"${authPath.AUTH0_CLIENT_ID}",
                "client_secret":"${authPath.AUTH0_CLIENT_SECRET}",
                "audience":"https://${authPath.AUTH0_DOMAIN}/api/v2/",
                "grant_type":"client_credentials"
            }`
        },(error,response,body) => {
            if(error) {
                console.log("oAuth error", error);
                reject(error);
            }

            let accessToken = JSON.parse(body).access_token;
            request({
                method: 'GET',
                url:`https://${authPath.AUTH0_DOMAIN}/api/v2/users/${userId}`,
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }, (err, response) => {
                if(err){
                    console.log("error", err);
                    reject(err);
                }
                let fbAccessKey = JSON.parse(response.body).identities[0].access_token;
                resolve(JSON.parse(response.body).identities);
            });
        });
    });
};

const getFaceBookPosts = function(fbAccessKey) {
    let posts = '';
    let url = `https://graph.facebook.com/v2.8/me/posts?access_token=${fbAccessKey}`;
    let page = 1;

    function recursivePostFinder(url, cb) {
        request.get(url, (err, responseObject) => {
            if(err){
                console.log("error in recursive get", err);
            }
            responseObject = JSON.parse(responseObject.body);

            if(responseObject.data.length === 0) {
                cb(posts);

            } else {
                responseObject.data.forEach((postObject) => {
                    if(postObject.message){
                        posts = posts + " " + postObject.message.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                    }
                });

                console.log(`added posts from page ${page}`);
                page++;

                recursivePostFinder(responseObject.paging.next, cb);
            }
        })
    };

    return new Promise((resolve, reject) => {
        recursivePostFinder(url,posts => resolve(posts));
    });
};

const watsonAnalyze = function (posts) {
    const params = {
        text: posts,
        consumption_preferences: false,
        raw_scores: false,
        headers: {
            'accept-language': 'en',
            'accept': 'application/json'
        }
    };

    personality_insights.profile(params, (error, response) => {
        if (error) {
            console.log('ERROR: ', error);
        } else {
            console.log(JSON.stringify(response, null, 2));
        }
    });
}

const puppyMatcher = function(userId, watsonData){
    let breedArray = [];
    let breedObj = {
        labrador_retriever: {
            traits:[],
            names:['lab', 'yellow lab', 'black lab']
        },
        german_shepherd: null,
        golden_retriever: null,
        bullgod: null,
        beagle: null,
        french_bulldog: null,
        yorkshire_terrier: null,
        poodle: null,
        rottweiler: null,
        boxer: null,
        german_shorthaired_pointer: null,
        siberian_husky: null,
        dachshund: null,
        doberman_pinscher: null,
        great_dane: null,
        miniature_schnauzer: null,
        australian_shepherd: null,
        cavalier_king_charles_spaniel: null,
        shihtzu: null
    };

    for(let key in breedObj){
        if(breedObj[key]){ //<== some matching logic to be written later
            breedArray.push(key);
        }
    }

    User.findOne({'id': userId})
        .exec((err, user) => {
           user.addBlackListBreeds(breedArray)
            .then(saved => console.log("saved breeds ==>",saved));
        });
}


module.exports = {
    getUserAccessKeys: getUserAccessKeys,
    getFaceBookPosts: getFaceBookPosts,
    watsonAnalyze: watsonAnalyze
};