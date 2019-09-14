class Helpers {

    constructor(){
        this.regex = ".*";
    }

    createRegexes(vowellessWord){
        var regexWord = "";
        for(var i = 0; i < vowellessWord.length; i++){
           regexWord += vowellessWord.slice(i,i+1) + this.regex;
        }
        console.log(regexWord);
        return regexWord;
    }
}

helper = new Helpers();
helper.createRegexes("brd");