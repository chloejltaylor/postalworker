import Phaser from '../lib/phaser.js'


export default class Bonus extends Phaser.Scene
{
    constructor() 
    {
    super('bonus')
    }

    // Time needed for onboarding

    onboardingtime = 5000

    // Starting positions of the draggables
    startItemX = 700
    startItemY = 750
    itemsArray = ['item1','item2', 'item3', 'item4']
    countNum = 30
    currentTargetX
    currentTargetY
    target1posX = 200
    target1posY = 350
    target2posX = 550
    target2posY = 350
    target3posX = 900
    target3posY = 350
    target4posX = 1250
    target4posY = 350
    allTargets

     //End positions
    end1posX = 200
    end1posY = 250
    end2posX = 550
    end2posY = 250
    end3posX = 900
    end3posY = 250
    end4posX = 1250
    end4posY = 250
    allEndPositions

    preload()
    {
    }

    init(){
        this.countNum=5
    }

    create()
    {


        this.onboardingTimer = this.time.delayedCall(800, this.onboardingAnim, [], this)
    


        // Coordinates of the drop zones
        this.allTargets = [[this.target1posX,this.target1posY], [this.target2posX,this.target2posY], [this.target3posX, this.target3posY], [this.target4posX,this.target4posY]]

        // Coordinates of the end positions
        this.allEndPositions = [[this.end1posX, this.end1posY], [this.end2posX, this.end2posY], [this.end3posX, this.end3posY], [this.end4posX, this.end4posY]]


        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300


        //Position images
        this.add.image(700, 450, 'background');
        this.add.image(700, 800,'dock')
        this.add.image(400, 800, 'counterBackground').setScale(-1,1)
        this.add.image(1000, 800, 'counterBackground')

        
        //countdown timer
        this.timerDisplay = this.add.text(400, 750, "30", { font: "72px Arial",fill: 'black' })

        //counting timer
        this.itemCounter = this.add.text(1000, 750, "0", { font: "72px Arial",fill: 'black' })

        //  Create a 'drop zone'
        this.target1 = this.add.image(this.target1posX, this.target1posY, 'bin1').setScale(0.7)
        this.target2 = this.add.image(this.target2posX, this.target2posY, 'bin2').setScale(0.7)
        this.target3 = this.add.image(this.target3posX, this.target3posY, 'bin3').setScale(0.7)
        this.target4 = this.add.image(this.target4posX, this.target4posY, 'bin4').setScale(0.7)

       

        // Place draggables
        
        this.items = this.physics.add.group()

        // Phaser.Math.Between(0, 3)
        this.onboardingTimer = this.time.delayedCall(this.onboardingtime, dispenseItem, [], this)

        function dispenseItem() {
            this.item = this.items.create(this.startItemX, this.startItemY, this.itemsArray[Phaser.Math.Between(0, 3)]  ).setInteractive({ draggable: true })
        //Find out which bin it should go in
        this.matchItemWithBin(this.item)
        }

        

        
        //initialise the number correct
        this.numcorrect = 0


        // Move the draggable with the pointer
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // Release the draggable
        this.input.on('dragend', (pointer, gameObject) => {

            // note where the draggable has been released
            const x = gameObject.x;
            const y = gameObject.y;

            // If the correct draggable is dropped in the drop zone...
            if ((x < this.currentTargetX+marginX && x > this.currentTargetX-marginX) && (y < this.currentTargetY+marginY && y > this.currentTargetY-marginY))
            {
                this.sound.play('correct')
                gameObject.disableInteractive()
                this.tweens.add({
                    targets: gameObject,
                    props: {
                        scale: { value: 0, duration: 500 },
                    },
                    ease: 'Sine.easeInOut',
                })
                this.time.delayedCall(1000, disappear, [], this)

                function disappear(){
                    this.physics.world.disableBody(gameObject.body)
                    this.items.killAndHide(gameObject)
                }
                gameObject.x = this.currentEndPositionX
                gameObject.y = this.currentEndPositionY
                this.numcorrect++
                this.itemCounter.text = this.numcorrect
                this.item = this.items.create(this.startItemX, this.startItemY, this.itemsArray[Phaser.Math.Between(0, 3)]).setInteractive({ draggable: true })
                this.matchItemWithBin(this.item)

            } 
            else {

                this.sound.play('incorrect')
                this.tweens.add({
                    targets: gameObject,
                    props: {
                        x: { value: this.startItemX, duration: 800 },
                        y: { value: this.startItemY, duration: 800 },
                    },
                    ease: 'Sine.easeInOut',
                });
            }
            })


            this.time.delayedCall(this.onboardingtime, timer, [], this)


            function timer() {
                this.time.addEvent({
                    delay: 1000,                // ms
                    callback: count,
                    //args: [],
                    callbackScope: this,
                    repeat: this.countNum-1
                })
            } 

            function count() {
                this.countNum--
                this.timerDisplay.text = this.countNum
                if(this.countNum ==0){this.endGame()}
            }

                    // Onboarding
        this.onboardingItem = this.add.image(this.startItemX, this.startItemY, 'item1')
        this.onboardingItem.setAlpha(0)
        this.hand = this.add.spine(this.startItemX, this.startItemY, 'hand')
        this.handanims = this.hand.getAnimationList()
        this.hand.setAlpha(0)
        


        }


        endGame(){
            console.log("THEY THINK IT'S ALL OVER")
            this.items.setVisible(false)
            this.time.delayedCall(1000, moveToCongratulationsScreen, [], this)
            function moveToCongratulationsScreen(){
                this.scene.start('congratulations', {finalscore: this.numcorrect})
            }
            
        }

        matchItemWithBin(rubbish) {
            
            if(rubbish.texture.key == 'item1'){
                console.log("Bin 1")
                this.currentTargetX=this.allTargets[0][0],
                this.currentTargetY=this.allTargets[0][1],
                this.currentEndPositionX=this.allEndPositions[0][0],
                this.currentEndPositionY=this.allEndPositions[0][1]
             }
            else if(rubbish.texture.key == 'item2'){
                this.currentTargetX=this.allTargets[1][0],
                this.currentTargetY=this.allTargets[1][1],
                this.currentEndPositionX=this.allEndPositions[1][0],
                this.currentEndPositionY=this.allEndPositions[1][1]
            }
            else if(rubbish.texture.key == 'item3'){
                this.currentTargetX=this.allTargets[2][0],
                this.currentTargetY=this.allTargets[2][1],
                this.currentEndPositionX=this.allEndPositions[2][0],
                this.currentEndPositionY=this.allEndPositions[2][1]
            }
            else if(rubbish.texture.key == 'item4'){
                this.currentTargetX=this.allTargets[3][0],
                this.currentTargetY=this.allTargets[3][1],
                this.currentEndPositionX=this.allEndPositions[3][0],
                this.currentEndPositionY=this.allEndPositions[3][1]
            }
        }

        onboardingAnim() {
            this.hand.play(this.handanims[1], false)
            this.tweens.chain({
                targets: [this.hand, this.onboardingItem],
                tweens: [
                    {
                        x: this.startItemX,
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {
                        x: this.startItemX,
                        y: this.startItemY,
                        ease: 'Sine.easeInOut',
                        duration: 500
                    },
                    {
                        x: this.end1posX,
                        y: this.end1posY,
                        ease: 'Sine.easeInOut',
                        duration: 2000
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },

                ]
            })

        }


}