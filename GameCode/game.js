 var s = document.getElementById("../Sound/breath");
    function breath() {
        s.play();
    }
    function game() {
		
		
        var buttonReady = document.getElementById("buttonReady");
        buttonReady.remove();
		
		var keyCodes = {};
		var lasers = [];
		var enemyBullets = [];
        var enemies = [];
		var explosion = null;
		var dima = null;
		var firstAsteroid = [];
        var secondAsteroid = [];
		var score = 0;
		var start = 0;
		var enemiesLasers = [];
		
		//sounds
		var explosionSound = document.getElementById("audio2");
        explosionSound.src = "../Sound/Explosion croma key green screen, with explosion sound effect!.mp3";
        explosionSound.currentTime = 0;
		
        var darthVaderScream = document.getElementById("audio3");
        darthVaderScream.src = "../Sound/Darth Vader NO!.mp3";
        darthVaderScream.currentTime = 0;
		
		var mainTheme = document.getElementById("mainTheme");
        mainTheme.src = "../Sound/Star Wars- The Imperial March (Darth Vader's Theme) (1).mp3";
        mainTheme.currentTime = 0;
        mainTheme.play();
		//canvas
        var canvas = document.getElementById("canvas");
        c = canvas.getContext("2d");
        var innerWidth = 1280, innerHeight = 800;
        canvas.width = innerWidth;
        canvas.height = innerHeight;
		this.update = function () {
            this.draw();
        };
        
		function playingBackground() {
            document.body.style.backgroundImage = 'url(../Images/space-tumblr-wallpapers-high-quality-resolution-for-free-wallpaper.jpg)';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        }
        ;
        playingBackground();
		
        //death star object
        function object(x, y, width, height, image) {

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.image = image;
            var img = new Image();
            img.src = this.image;
            this.health = 5;

            this.update = function () {
                this.draw();
            };
            this.draw = function () {
                c.beginPath();
                c.rect(this.x, this.y, this.width, this.height, this.image);
                c.drawImage(img, this.x, this.y, this.width, this.height);

            };
        }
		
        //enemy object
        function enemyShip(x, y, width, height, image) {

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            this.image = image;
            var img = new Image();
            img.src = this.image;


            this.maxSpeed = 8;
            this.minSpeed = -8;
            this.xval = (Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed);
            this.yval = (Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed);


            this.update = function () {
                this.draw();
            };
            this.draw = function () {
                c.beginPath();
                c.rect(this.x, this.y, this.width, this.height, this.image);
                c.drawImage(img, this.x, this.y, this.width, this.height);

                this.x = this.x + this.xval;
                this.y = this.y + this.yval;
                if (this.x < 200 || this.x > 1280) {
                    this.xval = -this.xval;
                }
                if (this.y < 1 || this.y > 750) {
                    this.yval = -this.yval;
                }

            };
        }
		
		//bullet object
        function bullet(x, y, width, height, image) {

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.image = "../Images/" + image;
            var img = new Image();
            img.src = this.image;

            this.update = function () {
                this.draw();
            };
            this.fire = function () {
                this.x -= 25;
            }
            this.draw = function () {
                c.beginPath();
                c.rect(this.x, this.y, this.width, this.height, this.image);
                c.drawImage(img, this.x, this.y, this.width, this.height);

                this.x += 15;
            };
        }
		
		//death star
        var deathStar = new object(0, 0, 100, 100, '../Images/Death_Star.png');
        
		//enemy ships
        for (var i = 0; i < 5; i++) {
            enemies[i] = new enemyShip(Math.floor(Math.random() * (1210 - 900) + 900), Math.floor(Math.random() * 700), 70, 44, '../Images/crashed-x-wing-png-7.png');
        }
		
		//keyboard 
		function keysPressed() {
            //fire
            if (keyCodes["32"]) {
                laser = new bullet(deathStar.x + 150, deathStar.y + 47, 30, 3, 'laser.png');
                lasers.push(laser);
            }

            // left
            if (keyCodes["37"]) {
                deathStar.x -= 5;
            }

            // right
            if (keyCodes["39"]) {
                deathStar.x += 5;
            }

            // down
            if (keyCodes["38"]) {
                deathStar.y -= 5;

            }

            // up
            if (keyCodes["40"]) {
                deathStar.y += 5;
            }
        }
		
		//explosion
        function showExplosion(x, y, w, h, id) {
            explosion = document.createElement("div");
            explosion.id = id;
            explosion.style.width = w + "px";
            explosion.style.height = h + "px";
            explosion.style.position = "absolute";
            explosion.style.left = x + "px";
            explosion.style.top = y + "px";
            explosion.style.backgroundImage = "url(../Images/explosions-transparent-pixelated-3.gif)";
            explosion.style.backgroundSize = "contain";
            explosion.style.backgroundRepeat = "no-repeat";
            document.body.appendChild(explosion);
            setTimeout(function () {
                var element = document.getElementById(id);
                element.remove();
            }, 1000)
        }
        ;
        
        //cv
        function showCv() {
            dima = document.createElement("div");
            dima.style.width = "800px";
            dima.style.height = "500px";
            dima.style.position = "absolute";
            dima.style.left = "200px";
            dima.style.top = "256px";
            dima.style.backgroundImage = "url('../Images/cv.png')";
            dima.style.backgroundSize = "contain";
            dima.style.backgroundRepeat = "no-repeat";
            document.body.appendChild(dima);

        }
        ;
		
		//collisions
		var enemyIsHitted = function (lasers, enemies) {
            for (var i = 0; i < lasers.length; i++) {
                for (var j = 0; j < enemies.length; j++) {
                    if (lasers[i].x < enemies[j].x + enemies[j].width &&
                            lasers[i].x + lasers[i].width > enemies[j].x &&
                            lasers[i].y < enemies[j].y + enemies[j].height &&
                            lasers[i].y + lasers[i].height > enemies[j].y) {
                        showExplosion(enemies[j].x, enemies[j].y, enemies[j].width, enemies[j].height, 'id' + j);
                        lasers.splice(i, 1);
                        enemies.splice(j, 1);
                        score++;
                        explosionSound.play();
                    }
                }
            }
        };

        var playerIsHitted = function (lasers, deathStar) {
            for (var i = 0; i < lasers.length; i++) {

                if (lasers[i].x < deathStar.x + deathStar.width &&
                        lasers[i].x + lasers[i].width > deathStar.x &&
                        lasers[i].y < deathStar.y + deathStar.height &&
                        lasers[i].y + lasers[i].height > deathStar.y) {
                    showExplosion(deathStar.x, deathStar.y, deathStar.width, deathStar.height, 'id');

                    lasers.splice(i, 1);
                    deathStar.health = deathStar.health - 1;
                    if (deathStar.health == 0) {
                        darthVaderScream.play();
                    }
                    explosionSound.play();

                }
            }
        };


		//asteroids
        
        for (var i = 0; i < 3; i++) {
            var asteroid1 = new bullet((Math.random() * (3000 - 2000) + 2000), Math.floor(Math.random() * 1100), 50, 50, '../Images/1.png');
            firstAsteroid.push(asteroid1);
        }
        for (var i = 0; i < 3; i++) {
            var asteroid2 = new bullet((Math.random() * (3000 - 2000) + 2000), Math.floor(Math.random() * 1100), 50, 50, '../Images/2.png');
            secondAsteroid.push(asteroid2);
        }
		
        //animation function
		function animate(currentTimeStamp) {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);

            if (deathStar.health > 0) {
                deathStar.update();
            } else if (deathStar.health <= 0) {
                c.clearRect(deathStar.x = 0, deathStar.y = 0, deathStar.width = 0, deathStar.height=0);
            }
            var time = currentTimeStamp - start;


            for (var i = 0; i < enemies.length; i++) {
                enemies[i].update();
                for (var j = 0; j < enemies.length; j++) {

                    if (time > (Math.random() * (1500 - 2500 ) + 2500)) {
                        start = currentTimeStamp;
                        enemyBullets[j] = new bullet(enemies[i].x - 66, enemies[i].y + 30, 100, 3, '../Images/laser.png');
                        enemiesLasers.push(enemyBullets[j]);
                    }
                }
            }

            for (var i = 0; i < firstAsteroid.length; i++) {
                firstAsteroid[i].update();
                setTimeout((firstAsteroid[i].x = firstAsteroid[i].x - 20), 5000);
            }
            for (var i = 0; i < secondAsteroid.length; i++) {
                secondAsteroid[i].update();
                secondAsteroid[i].x = secondAsteroid[i].x - 16;
            }
            for (var i = 0; i < enemiesLasers.length; i++) {

                enemiesLasers[i].update();
                enemiesLasers[i].fire();

                if (enemiesLasers[i].x < -1) {
                    enemiesLasers.splice[i, 1];
                }
            }

            for (var i = 0; i < lasers.length; i++) {
                lasers[i].update();
            }
            enemyIsHitted(lasers, enemies);
            playerIsHitted(enemiesLasers, deathStar);
            document.getElementById("score").innerHTML = "Score: " + score + "  " + "Heath: " + deathStar.health;
            if (enemies.length == 0 || deathStar.health == 0) {
                showCv();
				
            }
            keysPressed();
        }
		
        animate();


        window.onkeydown = function (evt) {
            keyCodes[evt.keyCode] = true;

        };
        window.onkeyup = function (evt) {
            delete keyCodes[evt.keyCode];

        };
    }
    ;