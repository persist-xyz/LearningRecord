const imgSpd = () => {
  /*
  __    ___      ___  _______        ________ _______  ________   
 |" \  |"  \    /"  |/" _   "|      /"       |   __ "\|"      "\  
 ||  |  \   \  //   (: ( \___)     (:   \___/(. |__) :(.  ___  :) 
 |:  |  /\\  \/.    |\/ \           \___  \  |:  ____/|: \   ) || 
 |.  | |: \.        |//  \ ___       __/  \\ (|  /    (| (___\ || 
 /\  |\|.  \    /:  (:   _(  _|     /" \   :/|__/ \   |:       :) 
(__\_|_|___|\__/|___|\_______)     (_______(_______)  (________/  
  */
};

const consoler = () =>
  imgSpd
    .toString()
    .substring(
      imgSpd.toString().indexOf("/*") + 3,
      imgSpd.toString().lastIndexOf("*/")
    );

module.exports = consoler;