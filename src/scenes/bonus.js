import Phaser from '../lib/phaser.js'


export default class Bonus extends Phaser.Scene
{
    constructor() 
    {
    super('bonus')
    }

    // Time needed for onboarding

    onboardingtime = 6000

    // Starting positions of the draggables
    startStamp1X = 400
    startStamp1Y = 750
    startStamp2X = 700
    startStamp2Y = 750
    startStamp3X = 1000
    startStamp3Y = 750
    parcelsArrayOriginal = ['parcel1', 'parcel1', 'parcel3', 'parcel4', 'parcel5', 'parcel6']
    sizeArrayOriginal = ['small', 'small', 'medium', 'medium', 'large', 'large']
    dialAnglesOriginal = ['35', '35', '90', '90', '145', '145']
    indexNumbers = [0,1,2,3,4,5]
    parcelNum = 0
    currentTargetX = 700
    currentTargetY = 200
    currentParcel
    parcelCounters = ['postCounted0-6', 'postCounted1-6', 'postCounted2-6', 'postCounted3-6', 'postCounted4-6', 'postCounted5-6', 'postCounted6-6',]

    init(){
        this.parcelNum = 0
    }

    create()
    {

        //this randomises the parcels and matches the correct sizes and angles of the dial with the parcels
        this.parcelsArray=[]
        this.sizeArray =[]
        this.dialAngles=[]

        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }

        shuffle(this.indexNumbers)

        for(let i=0; i<6; i++){
            this.parcelsArray.push(this.parcelsArrayOriginal[this.indexNumbers[i]])
            this.sizeArray.push(this.sizeArrayOriginal[this.indexNumbers[i]])
            this.dialAngles.push(this.dialAnglesOriginal[this.indexNumbers[i]])
        }

        // start the onboarding animation 

        this.onboardingTimer = this.time.delayedCall(800, this.onboardingAnim, [], this)
        this.onboardingTimer = this.time.delayedCall(this.onboardingtime, this.dispenseParcel, [], this)

        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300


        //Position static images
        this.add.image(700, 450, 'background'); 
        this.add.image(700, 400, 'scales')
        
        this.add.image(700, 800,'stamp_dock')
        this.parcelCounter = this.add.image(1200, 800, 'postCounted0-6')

        // position dial
        this.dial = this.add.image(700, 520, 'scales_dial').setAngle(0).setAlpha(0)

        this.onboardingTimer = this.time.delayedCall(this.onboardingtime, showDial, [], this)
        function showDial(){
            this.dial.setAlpha(0)
        }


        function dispenseStamps()
        {

            this.stamp_1 = this.items.create(this.startStamp1X, this.startStamp1Y, 'stamp1').setInteractive({ draggable: true }).setDepth(1)
            this.stamp_1.size='small'
            this.stamp_1.startX = this.startStamp1X
            this.stamp_1.startY = this.startStamp1Y
            this.stamp_2 = this.items.create(this.startStamp2X, this.startStamp2Y, 'stamp2').setInteractive({ draggable: true }).setDepth(1)
            this.stamp_2.size='medium'
            this.stamp_2.startX = this.startStamp2X
            this.stamp_2.startY = this.startStamp2Y
            this.stamp_3 = this.items.create(this.startStamp3X, this.startStamp3Y, 'stamp3').setInteractive({ draggable: true }).setDepth(1)
            this.stamp_3.size='large'
            this.stamp_3.startX = this.startStamp3X
            this.stamp_3.startY = this.startStamp3Y
        }            



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
            if ((x < this.currentTargetX+marginX && x > this.currentTargetX-marginX) && (y < this.currentTargetY+marginY && y > this.currentTargetY-marginY)
                && gameObject.size == this.currentParcel.size)
            {

                this.parcelNum++                
                this.sound.play('correct')
                this.parcelCounter.setTexture(this.parcelCounters[this.parcelNum])
                gameObject.disableInteractive()
                this.tweens.add({
                    targets: gameObject,
                    props: {
                        alpha: { value: 0, duration: 500 },
                    },
                    ease: 'Sine.easeInOut',
                })
                if(this.parcelNum==6){
                    this.time.delayedCall(2000, endGame, [], this)
                    function endGame(){
                        this.scene.start('congratulations')
                    }

                    
                } else {
                    this.onboardingTimer = this.time.delayedCall(4000, this.dispenseParcel, [], this)
                    this.time.delayedCall(1000, resetScales, [], this)
                }


                function resetScales(){
                    // return stamp to base 
                    gameObject.x=gameObject.startX
                    gameObject.y=gameObject.startY
                    gameObject.setAlpha(1).setInteractive().setDepth(1);
                    this.tweens.add({
                        targets: this.dial,
                        props: {
                            angle: { value: 10, duration: 800 },
                        },
                        ease: 'Sine.easeInOut',
                    })
                    this.tweens.chain({
                        targets: [this.currentParcel],
                    tweens: [
                        {
                            alpha: 1,
                            duration: 200
                        },
                        {
        
                            alpha: 0,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        }
        
                    ]
                })
                }




                
                

            } 
            else {

                this.sound.play('incorrect')
                this.tweens.add({
                    targets: gameObject,
                    props: {
                        x: {value: gameObject.startX, duration: 800},
                        y: { value: this.startStamp1Y, duration: 800 },
                    },
                    ease: 'Sine.easeInOut',
                })
            }
            })

                    // Place draggables
        
        this.items = this.physics.add.group()
        
        this.onboardingTimer = this.time.delayedCall(this.onboardingtime, dispenseStamps, [], this)



                    // Onboarding
        this.onboardingparcel = this.add.image(this.currentTargetX, this.currentTargetY, 'parcel3').setAlpha(0)
        this.onboardingItem = this.add.image(this.startStamp2X, this.startStamp2Y, 'stamp2').setAlpha(0)
        this.onboardingDial = this.add.image(this.startStamp2X, 500, 'scales_dial').setAlpha(0).setAngle(90)
        this.hand = this.add.spine(this.startStamp2X, this.startStamp2X, 'hand')
        this.handanims = this.hand.getAnimationList()
        this.hand.setAlpha(0)
        


        }


        endGame(){
            this.items.setVisible(false)
            this.time.delayedCall(1000, moveToCongratulationsScreen, [], this)
            function moveToCongratulationsScreen(){
                this.scene.start('congratulations')
            }
            
        }


        onboardingAnim() {
            this.tweens.chain({
                targets: [this.onboardingparcel, this.onboardingDial],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 3500
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    }
                ]
            })
            
            this.hand.play(this.handanims[1], false)
            this.tweens.chain({
                targets: [this.hand, this.onboardingItem],
                tweens: [
                    {
                        x: this.startStamp2X,
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 1000
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {

                        y: this.startStamp2Y,
                        ease: 'Sine.easeInOut',
                        duration: 500
                    },
                    {
                        x: this.currentTargetX,
                        y: this.currentTargetY,
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



        dispenseParcel() {
            this.currentParcel = this.add.image(700,100, this.parcelsArray[this.parcelNum])
            this.currentParcel.size = this.sizeArray[this.parcelNum]
            this.tweens.chain({
                targets: [this.currentParcel],
                tweens: [
                    {
                        y: 100,
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {
                        y: this.currentTargetY,
                        ease: 'Sine.easeInOut',
                        duration: 2000
                    }
                ]
                
                
            })
            this.tweens.chain({
                targets: [this.dial],
            tweens: [
                {
                    alpha: 1,
                    angle: '10',
                    ease: 'Sine.easeInOut',
                    duration: 200
                },
                {

                    angle: this.dialAngles[this.parcelNum],
                    ease: 'Sine.easeInOut',
                    duration: 2000
                }

            ]
        })

        }


}