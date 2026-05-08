var juego = new Phaser.Game(370, 335, Phaser.CANVAS, 'bloque_juego');

// Variables

var fondoJuego;
var goku, vegeta;
var musica;

var teclaDerecha, teclaIzquierda, teclaArriba, teclaAbajo;
var teclaTransformar, teclaBase;

var imgBase, imgSSJ;
var nombreDev, botonBase, botonSsj;

//

var estadoPrincipal = {
    preload: function () {

        // carga todos los recursos
        // this.load.image('fondo', 'img/bg.jpeg');
        // this.load.spritesheet('pajaros', 'img/pajaro.png', 43, 30);
        //
        // Fondo
        this.load.image('fondo', 'img/ciudad.jpg');

        // Goku base
        this.load.spritesheet('goku_base', 'img/goku-base-sprite-sheet.png', 40, 65);

        // Goku ssj
        this.load.spritesheet('goku_ssj', 'img/goku-ssj-sprite-sheet.png', 40, 65);

        // Vegeta
        // this.load.spritesheet('vegeta_galick_ho', 'img/vegeta-sprite-sheet-aura.png', 200, 180);

        // Sonido de fondo
        this.load.audio('theme', 'assets/dbz-soundtrack_cut.ogg');

        // Efecto de sonido: transformación
        this.load.audio('transformacion_ssj', 'assets/ssj-efecto-sonido.ogg');

        // Efecto de sonido: estado base
        this.load.audio('transformacion_estado_base', 'assets/estado-base-efecto-sonido.ogg');

        // Manejo de imagenes del HTML:
        imgBase = document.getElementById('img-base');
        imgSSJ = document.getElementById('img-ssj');
        nombreDev = document.getElementById('nombre-dev');
        botonBase = document.getElementById('nombre-base');
        botonSsj = document.getElementById('nombre-ssj');

    },

    create: function () {

        // Musica
        try {
            music = this.sound.add('theme');
            this.input.onDown.addOnce(() => {
                if (this.sound.context.state === 'suspended') {
                    this.sound.context.resume().then(() => {
                        music.play('', 0, 0.15, true);
                    });
                } else {
                    music.play('', 0, 0.15, true);
                }
            }, this);

        } catch (e) {
            console.error("Error con el audio:", e);
        }

        // Sonido transformación
        sonidoTransformacion = this.sound.add('transformacion_ssj');
        sonidoEstadoBase = this.sound.add('transformacion_estado_base');
        ///

        // Flappy
        // flappy = juego.add.sprite(100, 100, 'pajaros');
        // flappy.frame = 1;
        // flappy.animations.add('vuelo', [0, 1, 2], 10, true);

        // Fondo
        fondoJuego = this.add.tileSprite(0, 0, 370, 550, 'fondo');

        // Goku
        goku = juego.add.sprite(150, 215, 'goku_base');
        goku.frame = 1;
        goku.animations.add('caminar', [0, 1, 2, 3, 4, 5], 5, true);

        // Vegeta
        // vegeta = juego.add.sprite(300, 210, 'vegeta_galick_ho');
        // vegeta.frame = 1;
        // vegeta.scale.setTo(0.45);

        // Controles
        teclaDerecha = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaArriba = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaAbajo = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        // Transformaciones
        teclaTransformar = this.input.keyboard.addKey(Phaser.Keyboard.F);
        teclaBase = this.input.keyboard.addKey(Phaser.Keyboard.G);

    },

    update: function () {
        // animamos el juego
        // flappy.animations.play('vuelo');

        const velocidad = 0.5;
        let moviendose = false;

        if (teclaDerecha.isDown) {
            moviendose = true;
            if (goku.x <= 250) {
                goku.x += velocidad;
            }

            fondoJuego.tilePosition.x -= 1.8;

        }
        if (teclaIzquierda.isDown) {
            moviendose = true;
            if (goku.x >= 0) {
                goku.x -= velocidad;
            }

            fondoJuego.tilePosition.x += 1.8;
        }
        if (teclaArriba.isDown) goku.y -= velocidad;
        if (teclaAbajo.isDown) {
            moviendose = true;
            if (goku.y <= 215) {
                goku.y += velocidad;
            }
        }

        if (moviendose) {
            goku.animations.play('caminar', null, true);
        } else {
            goku.animations.stop();

            goku.frame = 0;
        }

        // Transformar a SSJ
        if (teclaTransformar.justDown) {
            goku.loadTexture('goku_ssj');
            goku.animations.add('caminar', [0, 1, 2, 3, 4, 5], 5, true);
            sonidoTransformacion.play('', 0, 0.1);

            imgBase.classList.remove('personaje-activo');
            nombreDev.classList.remove('texto-base-activado');
            

            imgSSJ.classList.add('ssj-activo');
            nombreDev.classList.add('texto-ssj-activado');
            
        }

        // Volver a estado base
        if (teclaBase.justDown) {
            goku.loadTexture('goku_base');
            goku.animations.add('caminar', [0, 1, 2, 3, 4, 5], 5, true);
            sonidoEstadoBase.play('', 0, 0.1);

            imgSSJ.classList.remove('ssj-activo');
            nombreDev.classList.remove('texto-ssj-activado');
            

            imgBase.classList.add('personaje-activo');
            nombreDev.classList.add('texto-base-activado');
            
        }
    }
}

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');