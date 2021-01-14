var mongoose       = require("mongoose"),
    Campground     = require("./models/campgrounds");
    Comment        = require("./models/comments");
    var data = [
        {
            name: "Cloud's Rest", 
            image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
            description: "Weinstein, 68, has been placed in isolation at Wende Correctional Facility, said Michael Powers, president of the New York State Correctional Officers and Police Benevolent Association. Powers said he learned that the test came back positive on Sunday morning and is concerned about the corrections officers, who he said lack proper protective equipment. Several staff have been quarantined, Powers said."
        },
        {
            name: "Desert Mesa", 
            image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
            description: "Before he became director, he worked as an assistant director to noted filmmaker K Balachander. He has also worked as a screenwriter for remarkable films like Thillu Mullu, Netrikann among other films.Visu was known for his witty one-liners that are funny and thought-provoking as well. He had also played supporting roles in films like Irattai Roja, Arunachalam and Middle Class Madhavan."
        },
        {
            name: "Canyon Floor", 
            image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
            description: "s the entire nation is observing Janata Curfew today (March 22), film personalities are taking this opportunity to appeal to their fans to stay indoors and practise social-distancing. Kamal Haasan, Rajinikanth, Pawan Kalyan, Chiranjeevi, Amitabh Bachchan, Aamir Khan, and Deepika Padukone, among others, are who are lauding PM Narendra Modi's initiative to combat Covid-19. Madhavan took to Instagram to upload a five-minute-long video and asked people not to be overwhelmed with the information available on social media. He said, I hope all of you all are doing what it takes to be safe and doing precautionary measures at a time like this. This is going to be a unique historic phase in all our lives. One thing is for sure, the world"
        }
    ];

    function funct(){
        Campground.remove({}, function(err){
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("removed campgrounds");

                // data.forEach(function(cmpg){
                //     Campground.create(cmpg, function(err, data){
                //         if(err){
                //             console.log(err);
                //         }
                //         else
                //         {
                //             console.log("campground created");

                //             Comment.create({
                //                 text: "comment number 1284",
                //                 author: "Hommmeer"
                //             }, function(err, comment){
                //                 if(err)
                //                 {
                //                     console.log(err);
                //                 }
                //                 else
                //                 {
                //                     data.comments=data.comments.concat(comment);
                //                     data.save();
                //                     console.log("Created new comment");
                //                 }
                //             });
                //         }
                //     });
                // });
                
            }
        });
    };

    module.exports = funct;

    