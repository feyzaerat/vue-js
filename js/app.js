new Vue ({
    el: "#app",
    data:{
        player_health :100,
        monster_health:100,
        game_is_on:false,
        logs : [],
        attack_multiple : 10,
        special_attack_multiple : 25,
        heal_up_multiple :20,
        monster_attack_multiple :25,
        log_text :{
          attack : "GAMER ATTACK : ",
          special_attack : "GAMER SPECIAL ATTACK",
          monster_attack : "MONSTER ATTACK :",
          heal_up : "HELP"  ,
          give_up : "GAMER GAVE UP !!!"
        },

    },
    methods :{
           start_game : function () {
               this.game_is_on = true
           },
           attack : function () {
               var point = Math.ceil(Math.random()  * this.attack_multiple);
               this.monster_health -=point;
               this.add_to_log( {turn : "P", text : this.log_text.attack + point });
               this.monster_attack();

           },
           monster_attack : function() {
               var point = Math.ceil(Math.random()  * this.monster_attack_multiple);
               this.add_to_log( {turn : "M", text : this.log_text.monster_attack + point});
               this.player_health-=point;
           },
           special_attack : function () {
               var point = Math.ceil(Math.random()  * this.special_attack_multiple);
               this.monster_health -=point;
               this.add_to_log( {turn : "P", text : this.log_text.special_attack + point});

               this.monster_attack();

           },
           heal_up : function () {
               var point = Math.ceil(Math.random()  * this.heal_up_multiple);
               this.player_health +=point;
               this.add_to_log( {turn : "P", text : this.log_text.heal_up + point });
               this.monster_attack();

           },
           give_up : function () {
                this.player_health = 0;
                this.add_to_log( {turn : "P", text : this.log_text.give_up + point});


           },
           add_to_log : function (log) {
               this.logs.push(log);
           }
    },
    watch : {
        player_health : function (value) {
            if(value <=0) {
                this.player_health = 0;
               if( confirm("YOU LOST ! Would ypu like to try again ?")){
                   this.player_health = 100;
                   this.monster_health = 100;
                   this.logs = [];
               }
            }
            else if(value >= 100) {
                this.player_health = 100;
            }
        },
        monster_health : function (value) {
            if(value <=0) {
                this.monster_health = 0;
                if( confirm("YOU WON! Would ypu like to try again ? ?")){
                    this.player_health = 100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            }
            else if(value >= 100) {
                this.monster_health = 100;
            }
        }
    },
    computed : {
        player_progress : function () {
            return {
                width : this.player_health + "%"
            }
        },
        monster_progress : function () {
            return {
                width : this.monster_health + "%"
            }
        }
    }
})
