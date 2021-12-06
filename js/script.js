var SomeControl = {};
SomeControl.startButton = document.getElementById('startbutton');
SomeControl.translation = document.getElementById('translation');

SomeControl.canvas = document.getElementById('canvas');
SomeControl.submit = document.getElementById('submitButton');
SomeControl.tracker = document.getElementById('tracker');

SomeControl.ctx = SomeControl.canvas.getContext("2d");
SomeControl.complicityCheck = $('div.radioBtn');
SomeControl.startButton = $('#startbutton').show();
SomeControl.translation = $('#translation').hide();
SomeControl.submit = $('#submitButton').hide();
SomeControl.tracker = $('div.tracker').hide();
SomeControl.ctx.font = "32px serif";
SomeControl.ctx.fillText("",0,0);
SomeControl.countCorrect = 0;
SomeControl.countIncrorrect = 0;
SomeControl.correctAnsw = $('#correctAnsw');
SomeControl.incorrectAnsw = $('#incorrectAnsw');
SomeControl.firstLevel = $('#easy');
SomeControl.secondLevel = $('#medium');
SomeControl.thirdLevel = $('#hard');

var wordsEasy = ['Terrible','Nasty','Cold','Pain','Busy','Whole','Mention','Lessons','Persuade','Pretend'];
var wordsEasyTranslations = ['Ужасно','Противный','Холодно','Боль','Занят','Целый','Упомянуть','Уроки','Убедить','Притворяться'];
var wordsMedium = ['Addiction', 'Agriculture', 'Approve', 'Contemptuous', 'Crawl', 'Descend', 'Dissolve', 'Embarrassment', 'Humiliate', 'Landlord'];
var wordsMediumTranslations = ['Зависимость','Колхоз','Одобрять','Презрительный','Ползать','Спускаться','Разрушать','Затруденение','Унижать','Землевладелец'];
var wordsHard = ['absolution','affable','headstrong','placid','reprieve','resolution','remuneration','enhance','enshroud','hamper'];
var wordsHardTranslations = ['Освобождение','Приветливый','Своевольный','Безмятежный','Передышка','Решительность','Вознаграждение','Усиливать','Закутывать','Препятствовать'];

SomeControl.currentPosition = $('#currentPosition');
const random = Math.floor(Math.random() * wordsEasy.length);
var index = 0;
var wordSelected = "";
var wordSelectedTranslation = "";
SomeControl.level = -1;

var startTest = function(){

    $("div.canvas").css("display", "block");

    SomeControl.translation.show();
    SomeControl.submit.show();
    SomeControl.tracker.show();
    SomeControl.startButton.hide();
    SomeControl.complicityCheck.hide();

    if(SomeControl.firstLevel.is(":checked") == true){
        testEasy();
        SomeControl.level=0;
    } else if(SomeControl.secondLevel.is(":checked") == true){
        testMedium();
        SomeControl.level=1;
    }
    else if(SomeControl.thirdLevel.is(":checked") == true){
        testHard();
        SomeControl.level=2;
    }

}

var isEnd = function(){
    
    if (SomeControl.level==0 && wordsEasy.length==0){
        return true;
    } else if (SomeControl.level==1 && wordsMedium.length==0){
        return true;
    }else if (SomeControl.level==2 && wordsHard.length==0){
        return true;
    }
    return false;
}

var SubmitAndChange = function(){
    if(SomeControl.translation.val().length == 0){
        alert("Введите что-то");
        return;
    }
    if(correct()){
        SomeControl.countCorrect +=1;
        console.log("верно")
    }
    else{
        SomeControl.countIncrorrect +=1;
    }
    updateStatus();
    if(isEnd()){
        var result = "";
        if(SomeControl.countCorrect<1){
            result = "Полный ноль! Ужас! Кошмар!"
        }
        else if(SomeControl.countCorrect<2){
            result = "Плоховато."
        }
        else if(SomeControl.countCorrect<3){
            result = "Натянутая 3-ка."
        }
        else if(SomeControl.countCorrect<5){
            result = "Удовлетворительно."
        }
        else if(SomeControl.countCorrect<7){
            result = "Хорошо!"
        }
        else if(SomeControl.countCorrect<8){
            result = "Отлично!"
        }
        else{
            result = "Вы лучший"
        }
        alert(`Квест окончен с результатом: ${SomeControl.countCorrect}/10. Ваш уровень английского: ${result}`);
        location.reload();
        
    }
    console.log(SomeControl.level);
    if (SomeControl.level==0){
        testEasy();
    } else if (SomeControl.level==1){
        testMedium();
    }else if (SomeControl.level==2){
        testHard();
    }
}



var testEasy = function(){

    index = Math.floor(Math.random()*wordsEasy.length);

    wordSelected = wordsEasy[index];
    wordSelectedTranslation = wordsEasyTranslations[index];

    SomeControl.ctx.clearRect(30,30, SomeControl.canvas.width, SomeControl.canvas.height);
    SomeControl.ctx.fillText(wordSelected, 90,80);

    wordsEasy.splice(index, 1);
    wordsEasyTranslations.splice(index, 1);
    
}

var testMedium = function(){

    index = Math.floor(Math.random()*wordsMedium.length);

    wordSelected = wordsMedium[index];
    wordSelectedTranslation = wordsMediumTranslations[index];

    SomeControl.ctx.clearRect(30,30, SomeControl.canvas.width, SomeControl.canvas.height);
    SomeControl.ctx.fillText(wordSelected, 90,80);

    wordsMedium.splice(index, 1);
    wordsMediumTranslations.splice(index, 1);
}

var testHard = function(){
    
    index = Math.floor(Math.random()*wordsHard.length);

    wordSelected = wordsHard[index];
    wordSelectedTranslation = wordsHardTranslations[index];

    SomeControl.ctx.clearRect(30,30, SomeControl.canvas.width, SomeControl.canvas.height);
    SomeControl.ctx.fillText(wordSelected, 90,80);

    wordsHard.splice(index, 1);
    wordsHardTranslations.splice(index, 1);
}

var correct = function(){
    console.log(SomeControl.translation.val(),wordSelectedTranslation);
    if(SomeControl.translation.val() == wordSelectedTranslation){
        return true;
    }
    return false;
}

var updateStatus = function(){

    SomeControl.currentPosition.text(SomeControl.countCorrect+ SomeControl.countIncrorrect);
    SomeControl.correctAnsw.text(SomeControl.countCorrect);
    SomeControl.incorrectAnsw.text(SomeControl.countIncrorrect);

}
