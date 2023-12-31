import Phaser from '../lib/phaser.js'


export default class level1 extends Phaser.Scene
{
    constructor() 
    {
    super('level1')
    }
   

    // Time needed for onboarding

    onboardingtime = 5000

    // Starting positions of the draggables
    startItemX = 700
    startItemY = 750
    itemsArray1 = ['item1_1','item1_2', 'item1_3', 'item1_4']
    itemsArray2 = ['item2_1','item2_2', 'item2_3', 'item2_4', 'item2_5','item2_6']
    itemsArray3 = ['item3_1','item3_2', 'item3_3', 'item3_4', 'item3_5','item3_6','item3_7','item3_8']
    itemsArray = [this.itemsArray1, this.itemsArray2, this.itemsArray3]

    currentTargetX
    currentTargetY

    scrollDistance = 100
    scrollOffset = 0

    // LEVEL 1
    // HOUSES
    target1_1posX = 200
    target1_1posY = 350
    target1_2posX = 550
    target1_2posY = 350
    target1_3posX = 900
    target1_3posY = 350
    target1_4posX = 1250
    target1_4posY = 350
    allTargets1

     //End positions
    end1_1posX = 200
    end1_1posY = 250
    end1_2posX = 550
    end1_2posY = 250
    end1_3posX = 900
    end1_3posY = 250
    end1_4posX = 1250
    end1_4posY = 250
    allEndPositions1

    //LEVEL 2
    // HOUSES
    target2_1posX = 160
    target2_1posY = 350
    target2_2posX = 450
    target2_2posY = 350
    target2_3posX = 600
    target2_3posY = 350
    target2_4posX = 890
    target2_4posY = 350
    target2_5posX = 1165
    target2_5posY = 350   
    target2_6posX = 1315
    target2_6posY = 350 
    allTargets2

    //END POSITIONS
    end2_1posX = 160
    end2_1posY = 350
    end2_2posX = 450
    end2_2posY = 350
    end2_3posX = 600
    end2_3posY = 350
    end2_4posX = 890
    end2_4posY = 350
    end2_5posX = 1165
    end2_5posY = 350   
    end2_6posX = 1315
    end2_6posY = 350
    allEndPositions2

        //LEVEL 3
    // HOUSES
    target3_1posX = -440
    target3_1posY = 350
    target3_2posX = -250
    target3_2posY = 350
    target3_3posX = 130
    target3_3posY = 350
    target3_4posX = 510
    target3_4posY = 350
    target3_5posX = 700
    target3_5posY = 350   
    target3_6posX = 1100
    target3_6posY = 260
    target3_7posX = 1100
    target3_7posY = 495
    target3_8posX = 1600
    target3_8posY = 350 
    allTargets3

    //END POSITIONS
    end3_1posX = this.target3_1posX
    end3_1posY = this.target3_1posY
    end3_2posX = this.target3_2posX
    end3_2posY = this.target3_2posY
    end3_3posX = this.target3_3posX
    end3_3posY = this.target3_3posY
    end3_4posX = this.target3_4posX
    end3_4posY = this.target3_4posY
    end3_5posX = this.target3_5posX
    end3_5posY = this.target3_5posY   
    end3_6posX = this.target3_6posX
    end3_6posY = this.target3_6posY
    end3_7posX = this.target3_7posX
    end3_7posY = this.target3_7posY
    end3_8posX = this.target3_8posX
    end3_8posY = this.target3_8posY
    allEndPositions3

    //next letter
    nextLetter = 0

    //array of counters
    letterCounters1 = ['letterCounter1_0-4', 'letterCounter1_1-4', 'letterCounter1_2-4', 'letterCounter1_3-4', 'letterCounter1_4-4']
    letterCounters2 = ['letterCounter2_0-6', 'letterCounter2_1-6', 'letterCounter2_2-6', 'letterCounter2_3-6', 'letterCounter2_4-6', 'letterCounter2_5-6', 'letterCounter2_6-6']
    letterCounters3 = ['letterCounter3_0-8', 'letterCounter3_1-8', 'letterCounter3_2-8', 'letterCounter3_3-8', 'letterCounter3_4-8', 'letterCounter3_5-8', 'letterCounter3_6-8', 'letterCounter3_7-8', 'letterCounter3_8-8']

    letterCounters = [this.letterCounters1, this.letterCounters2, this.letterCounters3]

    preload()
    {
    }

    init(data){
        this.level=data.level
        this.firstLevel=data.firstLevel
        this.nextLetter=0
        this.scrollOffset = 0
    }

    create()
    {


        // mix up letter order
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }


        // mix up numbers 
        if(this.level==0){this.orderofletters = [0,1,2,3]}
        else if(this.level==1){this.orderofletters = [0,1,2,3,4,5]}
        if(this.level==2){this.orderofletters = [0,1,2,3,4,5,6,7]}
        shuffle(this.orderofletters)
        if(this.firstLevel){
            this.onboardingTimer = this.time.delayedCall(800, this.onboardingAnim, [], this)

        }
    


        // Coordinates of the drop zones
        this.allTargets1 = [[this.target1_1posX,this.target1_1posY], [this.target1_2posX,this.target1_2posY], [this.target1_3posX, this.target1_3posY], [this.target1_4posX,this.target1_4posY]]
        this.allTargets2 = [[this.target2_1posX,this.target2_1posY], [this.target2_2posX,this.target2_2posY], [this.target2_3posX, this.target2_3posY], [this.target2_4posX,this.target2_4posY],[this.target2_5posX,this.target2_5posY], [this.target2_6posX,this.target2_6posY]]
        this.allTargets3 = [[this.target3_1posX,this.target3_1posY], [this.target3_2posX,this.target3_2posY], [this.target3_3posX, this.target3_3posY], [this.target3_4posX,this.target3_4posY], [this.target3_5posX,this.target3_5posY], [this.target3_6posX,this.target3_6posY], [this.target3_7posX,this.target3_7posY], [this.target3_8posX,this.target3_8posY]]
        this.alltargets = [this.allTargets1, this.allTargets2, this.allTargets3]

        // Coordinates of the end positions
        this.allEndPositions1 = [[this.end1_1posX, this.end1_1posY], [this.end1_2posX, this.end1_2posY], [this.end1_3posX, this.end1_3posY], [this.end1_4posX, this.end1_4posY]]
        this.allEndPositions2 = [[this.end2_1posX, this.end2_1posY], [this.end2_2posX, this.end2_2posY], [this.end2_3posX, this.end2_3posY], [this.end2_4posX, this.end2_4posY], [this.end2_5posX, this.end2_5posY], [this.end2_6posX, this.end2_6posY]]
        this.allEndPositions3 = [[this.end3_1posX, this.end3_1posY], [this.end3_2posX, this.end3_2posY], [this.end3_3posX, this.end3_3posY], [this.end3_4posX, this.end3_4posY], [this.end3_5posX, this.end2_5posY], [this.end3_6posX, this.end3_6posY], [this.end3_7posX, this.end3_7posY], [this.end3_8posX, this.end3_8posY]]

        
        this.allEndPositions = [this.allEndPositions1, this.allEndPositions2, this.allEndPositions3]



        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300


        //Position images
        this.add.image(0, 450, 'background')
        this.add.image(1400, 450, 'background')
        this.letterCounterImage = this.add.image(900, 800, this.letterCounters[this.level][0]).setScrollFactor(0)



        this.postalworker = this.add.spine(200, 800, 'pw').setScale(-1.2,1.2)
        this.postalworker.setInteractive().setScrollFactor(0)
        const charanims = this.postalworker.getAnimationList()
        
        this.postalworker.setInteractive().on('pointerdown', pointer =>
        {
            this.postalworker.play(charanims[2], false)
        })



        //  Create a 'drop zone'
        if(this.level==0){
            this.target1 = this.add.image(this.target1_1posX, this.target1_1posY, 'house1_1').setScale(0.7)
            this.target2 = this.add.image(this.target1_2posX, this.target1_2posY, 'house1_2').setScale(0.7)
            this.target3 = this.add.image(this.target1_3posX, this.target1_3posY, 'house1_3').setScale(0.7)
            this.target4 = this.add.image(this.target1_4posX, this.target1_4posY, 'house1_4').setScale(0.7)
        } else if(this.level==1) {
            this.target1 = this.add.image(this.target2_1posX, this.target2_1posY, 'house2_1').setScale(0.6)
            this.target2 = this.add.image(this.target2_2posX, this.target2_2posY, 'house2_2').setScale(0.7)
            this.target3 = this.add.image(this.target2_3posX, this.target2_3posY, 'house2_3').setScale(0.7)
            this.target4 = this.add.image(this.target2_4posX, this.target2_4posY, 'house2_4').setScale(0.6)
            this.target5 = this.add.image(this.target2_5posX, this.target2_5posY, 'house2_5').setScale(0.7)
            this.target6 = this.add.image(this.target2_6posX, this.target2_6posY, 'house2_6').setScale(0.7)
        } else if(this.level==2) {
            this.target1 = this.add.image(this.target3_1posX, this.target3_1posY, 'house3_1').setScale(0.7)
            this.target2 = this.add.image(this.target3_2posX, this.target3_2posY, 'house3_2').setScale(0.7)
            this.target3 = this.add.image(this.target3_3posX, this.target3_3posY, 'house3_3').setScale(0.8)
            this.target4 = this.add.image(this.target3_4posX, this.target3_4posY, 'house3_4').setScale(0.7)
            this.target5 = this.add.image(this.target3_5posX, this.target3_5posY, 'house3_5').setScale(0.7)
            this.target6 = this.add.image(this.target3_6posX, this.target3_6posY, 'house3_6').setScale(0.7)
            this.target7 = this.add.image(this.target3_7posX, this.target3_7posY, 'house3_7').setScale(0.7)
            this.target8 = this.add.image(this.target3_8posX, this.target3_8posY, 'house3_8').setScale(0.8)
        }


       

        // Place draggables
        
        this.items = this.physics.add.group()
        if(this.firstLevel){
            this.onboardingTimer = this.time.delayedCall(this.onboardingtime, dispenseItem, [], this)
        } else {
            this.onboardingTimer = this.time.delayedCall(1000, dispenseItem, [], this)
        }

        function dispenseItem() {
            this.item = this.items.create(this.startItemX, this.startItemY, this.itemsArray[this.level][this.orderofletters[this.nextLetter]]).setInteractive({ draggable: true }).setScrollFactor(0)
            this.item.letterNumber = this.nextLetter

            //Find out which bin it should go in
        this.matchLetterWithHouse()
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
            const x = gameObject.x+ (this.scrollDistance*this.scrollOffset)
            const y = gameObject.y

            // If the correct draggable is dropped in the drop zone...
            if ((x < this.currentTargetX+marginX && x > this.currentTargetX-marginX) && (y < this.currentTargetY+marginY && y > this.currentTargetY-marginY))
            {
                this.postalworker.play(charanims[3], false)
                this.currentEndPositionX = this.currentEndPositionX-this.scrollOffset*this.scrollDistance

                gameObject.x = this.currentEndPositionX
                gameObject.y = this.currentEndPositionY
                this.sound.play('correct')
                gameObject.disableInteractive()
                this.tweens.add({
                    targets: gameObject,
                    props: {
                        scale: { value: 0, duration: 1500 },
                        angle: { value: -360, duration: 1500 },
                        alpha: { value: 0, duration: 1500 },
                    },
                    ease: 'Sine.easeInOut',
                })
                this.time.delayedCall(1000, disappear, [], this)

                function disappear(){
                    this.physics.world.disableBody(gameObject.body)
                    this.items.killAndHide(gameObject)
                }


                this.numcorrect++
                this.nextLetter++
                this.letterCounterImage.setTexture(this.letterCounters[this.level][this.numcorrect])
                if(this.numcorrect==this.itemsArray[this.level].length){
                    this.time.delayedCall(2000, this.playTransition, [], this)
                    
                }
                else{
                    this.item = this.items.create(this.startItemX, this.startItemY, this.itemsArray[this.level][this.orderofletters[this.nextLetter]]).setInteractive({ draggable: true }).setScrollFactor(0)
                    this.item.letterNumber = this.nextLetter
                    this.matchLetterWithHouse()
                }


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


                    // Onboarding
        this.onboardingItem = this.add.image(this.startItemX, this.startItemY, 'item1_1')
        this.onboardingItem.setAlpha(0)
        this.hand = this.add.spine(this.startItemX, this.startItemY, 'hand')
        this.handanims = this.hand.getAnimationList()
        this.hand.setAlpha(0)

        
        //scrolling arrows

        if(this.level == 2){
            this.arrowLeft = this.add.image(100, 350, 'arrow-left').setScrollFactor(0)
            this.arrowRight = this.add.image(1300, 350, 'arrow-right').setScrollFactor(0)
            
            this.arrowLeft.setInteractive().on('pointerdown', pointer =>
            {
                this.scroll('left')
            })
    
            this.arrowRight.setInteractive().on('pointerdown', pointer =>
            {
                this.scroll('right')
            })
    
            this.cameraGuide = this.add.image(0, 450, 'platform').setAlpha(0)
            this.cameras.main.startFollow(this.cameraGuide, true).setFollowOffset(-700)
            
        }

        
    
        }



        scroll(direction){
            if(direction=='right'){
                if(this.scrollOffset<6){
                    this.scrollOffset++
                }
                
                this.cameraGuide.x = this.scrollOffset*this.scrollDistance
            } else 
            if(direction=='left'){
                if(this.scrollOffset>-7){
                    this.scrollOffset--
                }
                this.cameraGuide.x = this.scrollOffset*this.scrollDistance
            }

        }


        playTransition() {
           
            this.gameInProgress = false
            let continueButton = this.add.image(700, 450, 'continue').setInteractive().setScrollFactor(0)
            this.items.setVelocityX(0)
            continueButton.once('pointerdown', () => {
                this.scene.stop()
                if(this.level==0){
                    this.scene.start('level1',  {
                        level: 1,
                    }) 
                }
                else if(this.level==1){
                    this.scene.start('level1',  {
                        level: 2,
                    }) 
                }
                else if(this.level==2){

                    this.scene.start('intro-bonus')
                }
                
            })
        }

        matchLetterWithHouse() {

            this.currentTargetX=this.alltargets[this.level][this.orderofletters[this.nextLetter]][0]
            this.currentTargetY=this.alltargets[this.level][this.orderofletters[this.nextLetter]][1]
            this.currentEndPositionX=this.allEndPositions[this.level][this.orderofletters[this.nextLetter]][0]
            this.currentEndPositionY=this.allEndPositions[this.level][this.orderofletters[this.nextLetter]][1]

            

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
                        x: this.end1_1posX,
                        y: this.end1_1posY,
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