import Phaser from '../lib/phaser.js'
import eventsCenter from './eventscentre.js'

export default class Title extends Phaser.Scene

{

constructor()
{
super('title')
}


preload()
{

    this.scene.run('ui-scene')
    this.scene.run('music')
    
    this.load.image('play', './src/assets/Buttons/play_big_idle.png')
    this.load.image('background', './src/assets/Game/grid-bg.png')
    this.load.image('bg', './src/assets/Environment/bg.png') 
    this.load.image('player-ouch', './src/assets/temp/collision_npc.png')
    this.load.image('ouch', './src/assets/temp/collision_graphic.png') 

    this.load.image('target', './src/assets/temp/hitzone.png')
    this.load.image('handHelper', './src/assets/onboarding/onboarding_hand.png')
    this.load.spine("hand","./src/assets/Anim/hand/onboarding_hand.json","./src/assets/Anim/hand/onboarding_hand.atlas")
    this.load.image('playagain', './src/assets/Buttons/playagain.png')


    this.load.image('background', './src/assets/Game/grid-bg.png')
    this.load.image('platform', './src/assets/Environment/ground.png')
    this.load.audio('correct', './src/assets/Sounds/correct.mp3')
    this.load.audio('incorrect', './src/assets/Sounds/cartoonbubblepop.mp3')
    
    this.load.spine("pw","./src/assets/char/char_pw.json","./src/assets/char/char_pw.atlas")
    
    this.load.image('continue', './src/assets/Buttons/continue.png')
    this.load.image('close', './src/assets/Buttons/close.png')
    this.load.image('arrow-left', './src/assets/Items/level_3/scroll_left.png')
    this.load.image('arrow-right', './src/assets/Items/level_3/scroll_right.png')

    // items 
    this.load.image('item1_1', './src/assets/Items/level_1/l1_post_1.png')
    this.load.image('item1_2', './src/assets/Items/level_1/l1_post_2.png')
    this.load.image('item1_3', './src/assets/Items/level_1/l1_post_3.png')
    this.load.image('item1_4', './src/assets/Items/level_1/l1_post_4.png')
    this.load.image('house1_1', './src/assets/Items/level_1/l1_house-1.png')
    this.load.image('house1_2', './src/assets/Items/level_1/l1_house-2.png')
    this.load.image('house1_3', './src/assets/Items/level_1/l1_house-3.png')
    this.load.image('house1_4', './src/assets/Items/level_1/l1_house-4.png')
    this.load.image('letterCounter1_0-4', './src/assets/Items/level_1/l1_dock_counter_0-4.png')
    this.load.image('letterCounter1_1-4', './src/assets/Items/level_1/l1_dock_counter_1-4.png')
    this.load.image('letterCounter1_2-4', './src/assets/Items/level_1/l1_dock_counter_2-4.png')
    this.load.image('letterCounter1_3-4', './src/assets/Items/level_1/l1_dock_counter_3-4.png')
    this.load.image('letterCounter1_4-4', './src/assets/Items/level_1/l1_dock_counter_4-4.png')

    this.load.image('item2_1', './src/assets/Items/level_2/l2_post_1.png')
    this.load.image('item2_2', './src/assets/Items/level_2/l2_post_2.png')
    this.load.image('item2_3', './src/assets/Items/level_2/l2_post_3.png')
    this.load.image('item2_4', './src/assets/Items/level_2/l2_post_4.png')
    this.load.image('item2_5', './src/assets/Items/level_2/l2_post_5.png')
    this.load.image('item2_6', './src/assets/Items/level_2/l2_post_6.png')
    this.load.image('house2_1', './src/assets/Items/level_2/l2_house-1.png')
    this.load.image('house2_2', './src/assets/Items/level_2/l2_house-2.png')
    this.load.image('house2_3', './src/assets/Items/level_2/l2_house-3.png')
    this.load.image('house2_4', './src/assets/Items/level_2/l2_house-4.png')
    this.load.image('house2_5', './src/assets/Items/level_2/l2_house-5.png')
    this.load.image('house2_6', './src/assets/Items/level_2/l2_house-6.png')
    this.load.image('letterCounter2_0-6', './src/assets/Items/level_2/l2_dock_counter_0-6.png')
    this.load.image('letterCounter2_1-6', './src/assets/Items/level_2/l2_dock_counter_1-6.png')
    this.load.image('letterCounter2_2-6', './src/assets/Items/level_2/l2_dock_counter_2-6.png')
    this.load.image('letterCounter2_3-6', './src/assets/Items/level_2/l2_dock_counter_3-6.png')
    this.load.image('letterCounter2_4-6', './src/assets/Items/level_2/l2_dock_counter_4-6.png')
    this.load.image('letterCounter2_5-6', './src/assets/Items/level_2/l2_dock_counter_5-6.png')
    this.load.image('letterCounter2_6-6', './src/assets/Items/level_2/l2_dock_counter_6-6.png')

    this.load.image('item3_1', './src/assets/Items/level_3/l3_post_1.png')
    this.load.image('item3_2', './src/assets/Items/level_3/l3_post_2.png')
    this.load.image('item3_3', './src/assets/Items/level_3/l3_post_3.png')
    this.load.image('item3_4', './src/assets/Items/level_3/l3_post_4.png')
    this.load.image('item3_5', './src/assets/Items/level_3/l3_post_5.png')
    this.load.image('item3_6', './src/assets/Items/level_3/l3_post_6.png')
    this.load.image('item3_7', './src/assets/Items/level_3/l3_post_7.png')
    this.load.image('item3_8', './src/assets/Items/level_3/l3_post_8.png')
    this.load.image('house3_1', './src/assets/Items/level_3/l3_house-1.png')
    this.load.image('house3_2', './src/assets/Items/level_3/l3_house-2.png')
    this.load.image('house3_3', './src/assets/Items/level_3/l3_house-3.png')
    this.load.image('house3_4', './src/assets/Items/level_3/l3_house-4.png')
    this.load.image('house3_5', './src/assets/Items/level_3/l3_house-5.png')
    this.load.image('house3_6', './src/assets/Items/level_3/l3_house-6.png')
    this.load.image('house3_7', './src/assets/Items/level_3/l3_house-7.png')
    this.load.image('house3_8', './src/assets/Items/level_3/l3_house-8.png')
    this.load.image('letterCounter3_0-8', './src/assets/Items/level_3/l3_dock_counter_0-8.png')
    this.load.image('letterCounter3_1-8', './src/assets/Items/level_3/l3_dock_counter_1-8.png')
    this.load.image('letterCounter3_2-8', './src/assets/Items/level_3/l3_dock_counter_2-8.png')
    this.load.image('letterCounter3_3-8', './src/assets/Items/level_3/l3_dock_counter_3-8.png')
    this.load.image('letterCounter3_4-8', './src/assets/Items/level_3/l3_dock_counter_4-8.png')
    this.load.image('letterCounter3_5-8', './src/assets/Items/level_3/l3_dock_counter_5-8.png')
    this.load.image('letterCounter3_6-8', './src/assets/Items/level_3/l3_dock_counter_6-8.png')
    this.load.image('letterCounter3_7-8', './src/assets/Items/level_3/l3_dock_counter_7-8.png')
    this.load.image('letterCounter3_8-8', './src/assets/Items/level_3/l3_dock_counter_8-8.png')

    this.load.image('parcel1', './src/assets/bonus_level/post_1-s.png')
    this.load.image('parcel2', './src/assets/bonus_level/post_1-s.png')
    this.load.image('parcel3', './src/assets/bonus_level/post_2-m.png')
    this.load.image('parcel4', './src/assets/bonus_level/post_2-m.png')
    this.load.image('parcel5', './src/assets/bonus_level/post_3-l.png')
    this.load.image('parcel6', './src/assets/bonus_level/post_3-l.png')

    this.load.image('postCounted', './src/assets/bonus_level/post_counted_graphic.png')
    this.load.image('postCounted0-6', './src/assets/bonus_level/post_counter_0-6.png')
    this.load.image('postCounted1-6', './src/assets/bonus_level/post_counter_1-6.png')
    this.load.image('postCounted2-6', './src/assets/bonus_level/post_counter_2-6.png')
    this.load.image('postCounted3-6', './src/assets/bonus_level/post_counter_3-6.png')
    this.load.image('postCounted4-6', './src/assets/bonus_level/post_counter_4-6.png')
    this.load.image('postCounted5-6', './src/assets/bonus_level/post_counter_5-6.png')
    this.load.image('postCounted6-6', './src/assets/bonus_level/post_counter_6-6.png')

    this.load.image('scales_dial', './src/assets/bonus_level/scales_dial3.png')
    this.load.image('scales', './src/assets/bonus_level/scales.png')

    this.load.image('stamp1', './src/assets/bonus_level/stamp_1-s.png')
    this.load.image('stamp2', './src/assets/bonus_level/stamp_2-m.png')
    this.load.image('stamp3', './src/assets/bonus_level/stamp_2-l.png')

    this.load.image('stamp_dock', './src/assets/bonus_level/stamp_dock.png')



   
}

create()
{

    this.input.keyboard.on('keydown-SPACE', () => {
		eventsCenter.emit('display-next-level', this)
	})

	this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
		this.input.keyboard.off('keydown-SPACE')
	})

    

    const width = this.scale.width
    const height = this.scale.height

    this.add.image(700, 450, 'background');

    this.add.text(width * 0.5, height * 0.3, 'POSTAL WORKER', {
    fontSize: 48}).setOrigin(0.5)

    this.start = this.add.image(width * 0.5, height * 0.7, 'play').setScale(1.5).setInteractive()
    
    this.start.once('pointerdown', () => {
        this.scene.stop()

        this.scene.start('level1', {
            level: 2,
            firstLevel: true
        })

        // this.scene.start('bonus', {

        // })

        }
        )

}

}