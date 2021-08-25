namespace SpriteKind {
    export const gas = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.gas, function (sprite, otherSprite) {
    statusbar.value = 50
    otherSprite.destroy(effects.smiles, 100)
    music.baDing.playUntilDone()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f 4 f f 4 f . . . . . 
        . . . . f 2 4 f f 4 2 f . . . . 
        . . . . f 2 4 f f 4 2 f . . . . 
        . . . . f 2 4 f f 4 2 f . . . . 
        . . . . . f 4 f f 4 f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -90)
    projectile.startEffect(effects.warmRadial)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.coolRadial, 100)
    otherSprite.destroy()
    info.changeScoreBy(1)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.powerDown.play()
    otherSprite.destroy(effects.fire, 100)
})
let MyEnemy2: Sprite = null
let MyEnemy: Sprite = null
let myfuel: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f 1 f f f 1 f f . . . . 
    . . . f c c c c c c c f . . . . 
    . . . c f 8 8 8 8 8 f c . . . . 
    . . . c 2 f 8 8 8 f 7 c . . . . 
    . . . c 2 2 f 8 f 7 7 c . . . . 
    . . . c 2 2 2 f 7 7 7 c . . . . 
    . . . c 2 2 f 3 f 7 7 c . . . . 
    . . . c 2 f 3 3 3 f 7 c . . . . 
    . . . c f 3 3 3 3 3 f c . . . . 
    . . . . c c c c c c c . . . . . 
    . . . . 2 . . . . . 2 . . . . . 
    . . . 2 2 2 . . . 2 2 2 . . . . 
    . . 2 2 2 2 2 . 2 2 2 2 2 . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -20, 0)
game.onUpdateInterval(2000, function () {
    myfuel = sprites.createProjectileFromSide(img`
        . . . . . . . e e e e . . . . . 
        . . . . . e e 4 5 5 5 e e . . . 
        . . . . e 4 5 6 2 2 7 6 6 e . . 
        . . . e 5 6 6 7 2 2 6 4 4 4 e . 
        . . e 5 2 2 7 6 6 4 5 5 5 5 4 . 
        . e 5 6 2 2 8 8 5 5 5 5 5 4 5 4 
        . e 5 6 7 7 8 5 4 5 4 5 5 5 5 4 
        e 4 5 8 6 6 5 5 5 5 5 5 4 5 5 4 
        e 5 c e 8 5 5 5 4 5 5 5 5 5 5 4 
        e 5 c c e 5 4 5 5 5 4 5 5 5 e . 
        e 5 c c 5 5 5 5 5 5 5 5 4 e . . 
        e 5 e c 5 4 5 4 5 5 5 e e . . . 
        e 5 e e 5 5 5 5 5 4 e . . . . . 
        4 5 4 e 5 5 5 5 e e . . . . . . 
        . 4 5 4 5 5 4 e . . . . . . . . 
        . . 4 4 e e e . . . . . . . . . 
        `, 0, 50)
    myfuel.x = randint(5, 155)
    myfuel.setKind(SpriteKind.gas)
})
game.onUpdateInterval(2000, function () {
    statusbar.value += -10
})
game.onUpdateInterval(1000, function () {
    MyEnemy = sprites.createProjectileFromSide(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, 0, 50)
    MyEnemy.x = randint(5, 155)
    MyEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(1000, function () {
    MyEnemy2 = sprites.createProjectileFromSide(img`
        . . . . . . . c c c a c . . . . 
        . . c c b b b a c a a a c . . . 
        . c c a b a c b a a a b c c . . 
        . c a b c f f f b a b b b a . . 
        . c a c f f f 8 a b b b b b a . 
        . c a 8 f f 8 c a b b b b b a . 
        c c c a c c c c a b c f a b c c 
        c c a a a c c c a c f f c b b a 
        c c a b 6 a c c a f f c c b b a 
        c a b c 8 6 c c a a a b b c b c 
        c a c f f a c c a f a c c c b . 
        c a 8 f c c b a f f c b c c c . 
        . c b c c c c b f c a b b a c . 
        . . a b b b b b b b b b b b c . 
        . . . c c c c b b b b b c c . . 
        . . . . . . . . c b b c . . . . 
        `, 0, 50)
    MyEnemy2.x = randint(5, 155)
    MyEnemy2.setKind(SpriteKind.Enemy)
})
