//=============================================================================
// SVキャラのモーションを拡張するプラグイン
// FTKR_ExSvMotion.js
// プラグインNo : 24
// 作成者     : フトコロ
// 作成日     : 2017/04/19
// 最終更新日 : 2019/04/13
// バージョン : v1.4.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ESM = true;

var FTKR = FTKR || {};
FTKR.ESM = FTKR.ESM || {};

//=============================================================================
/*:
@plugindesc v1.4.0 Plugin that extends SV character motion
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/futokoro-MV-plugins ).
Original plugin by Futokoro.
Please check the URL below for the latest version of the plugin.
URL https://github.com/futokoro/RPGMaker
-----
-----------------------------------------------------------------------------
Overview
-----------------------------------------------------------------------------
Implementing this plugin changes the motions of SV characters during various actor states.

-----------------------------------------------------------------------------
Setup
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. When using with other plugins,
This plugin must be placed below the following plugins:
YEP_BattleEngineCore
YEP_X_AnimatedSVEnemies
YED_SideviewBattler

-----------------------------------------------------------------------------
Action Motion Settings
-----------------------------------------------------------------------------
Sets the actor's motions when not taking damage, attacking, or performing other actions.
The action motions that can be set are as follows:

Idle, Damage, Evasion, Thrust, Sweep, Projectile, Skill, Magic, Item

Specify one of the following code names in the Action Motion Settings plugin parameters.

Motion Codes
walk, wait, chant, guard, damage, Evasion, thrust, swing,
missile, skill, spell, item, escape, victory, dying,
abnormal, sleep, dead, custom*, other*

custom* is a custom motion. (* indicates a number)

other* is a motion with a different image. (* indicates a number)

-----------------------------------------------------------------------------
Setting Motions Individually for Skills and Items
-----------------------------------------------------------------------------
You can change the motions when waiting or using a skill or item by setting the following tags in the skill or item's Note field.

<ESM MOTION: name>
Changes the motion when using the skill to name.
Set the motion code for name.

<ESM WEAPON_MOTION>
This tag will set the motion to use the weapon you are holding.

<ESM CHANT_ON>
This tag will set the motion when waiting to execute a skill to the chant motion.

<ESM CHANT_OFF>
This tag disables the chant motion.
Even if the skill is set as a SV magic skill, the chant motion will not be executed.

-----------------------------------------------------------------------------
About Custom Motions
-----------------------------------------------------------------------------
Motions specified with custom* (where * is a number) are newly configurable
motions with this plugin.

You can display multiple motions consecutively by setting the motion code to display in the following plugin parameters.
Up to eight custom motions can be configured.

<Custom * Non Loop>
: The motion with the code set here will not loop.
<Custom * Loop>
: The motion with the code set here will loop.

You can enter multiple motion codes by using a comma (,).
You cannot use custom* with these parameters.

About Motion Looping
The motion set in <Custom * Loop> will loop.
Even if multiple codes are entered, they will be displayed in order and looped.
If not set, the custom motion will not loop.

Configuration Example)
<Custom * Non-Loop> : victory, skill
<Custom * Loop> : item, walk
If set as above, the motions will be displayed in the following order:

victory ⇒ skill ⇒ item ⇒ walk ⇒ item ⇒ walk ⇒ ...
|→Loop from here

-----------------------------------------------------------------------------
About Alternate Image Motions
----------------------------------------------------------------------------
Motions specified with "other*" (where * is a number) are actor-specific motions that can be newly set using this plugin.

You can use images other than the SV Battle character image selected in the actor's "Image" setting in the database.

The image to be used can be set in the actor's Note field using the following tag:

<ESM_IMAGE:filename>

Save the image file, filename.png, in img/sv_actors/.
The image format that can be used is the same as for SV Battle character images.

The * number in "other*" indicates which motion within the image to use.

A set of three images counts the motion in the top left as 0, the one below as 1, and the one to the right as 6.

You can use motions from "other0" through "other17."

Note that each individual image motion does not loop.

-----------------------------------------------------------------------------
Setting State Motions
-----------------------------------------------------------------------------
Sets motions for the actor's state:

input: Entering a command
chant: Chanting
guard: Defending/Waiting for Guard
state*: State being applied ( * indicates the state motion number) (e.g., state4)
victory: Victory in battle
escape: Escaping
dying: Near death (HP below 25%)
custom*: Custom condition ( * indicates a number) (e.g., custom1)
action: General action motion (leave the motion name blank)

Motions can be set from motion 1 through motion 16.
The higher the number, the higher the motion priority.

<Motion * Name>
: Specify the motion name code.
: walk, wait, chant, guard, damage, Evasion, thrust, swing
: missile, skill, spell, item, escape, victory, dying
: abnormal, sleep, dead, custom*, other*

<Motion * Condition>
: Motion condition. Select from the nine options listed above.
: Motions set as state motions will loop (except action).

*If no action is set, it will take priority over all action motions.

-----------------------------------------------------------------------------
State Motion Settings
-----------------------------------------------------------------------------
You can set the motion associated with a state by entering the following tags in the state's Note field.

<ESM MOTION: x>
: Set the state motion number to x.
: If no tag is specified, the default setting will be the [SV] motion setting.

<ESM FIXED_MOTION>
: Disables motion updates while the state is active.
: For example, if this state is activated during a defensive motion, the defensive motion will be fixed and the character will continue to perform the defensive motion regardless of any subsequent actions until the state is released.

-----------------------------------------------------------------------------
Custom Condition Settings
-----------------------------------------------------------------------------
You can set custom conditions for the <Motion * Condition> plugin parameter for the state motion.

Enter a JS condition expression in the <Custom Condition *> plugin parameter.

[About the Condition Expression Value]
Like damage calculation formulas, you can use values other than fixed values by entering a formula. The following code can be used:
a.param - References the user's parameter. (a.hit is the user's hit rate.)
v[x] - References the value of variable ID x.
s[x] - References the value of switch ID x.

-----------------------------------------------------------------------------
License for this plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin source
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.4.0 - 2019/04/13: Added Traits
1. Added the ability to set the action state for the state motion priority.

v1.3.2 - 2019/03/10: Added Traits
1. Added a plugin parameter, Enabled Refresh In PartyCmd, for plugins that skip party commands.

v1.3.1 - 2018/05/31: Bug Fixes
1. Fixed an issue where all party members would momentarily perform a defensive motion when one party member used Guard.

v1.3.0 - 2018/05/22: Traits Addition
1. Added a Traits to disable motion updates while certain states are in effect.

v1.2.10 - 2018/04/29: Bug Fixes
1. Fixed an issue where an error would occur when setting a non-looping motion as a state motion.

v1.2.9 - 2018/04/28: Bug Fixes
1. Fixed an issue where an error would occur when certain motions were performed with Log Display enabled in the Debug Settings.

v1.2.8 - 2018/04/28: Bug Fixes
1. Fixed an issue where the state motion settings for Collapse characters were not Reflectioned when combined with YEP_BattleEngineCore.js.

v1.2.7 - 2018/04/12: Bug Fixes
1. Fixed a bug where victory animations would not be executed when combined with YEP_VictoryAftermath.js.

v1.2.6 - 2018/04/10: Bug Fixes and Added Traits
1. Fixed an issue where animations other than 3 frames could not be displayed when combined with YED_SideviewBattler.
2. Added a tagging Traits to trigger casting animations for skills.

v1.2.5 - 2017/08/24: Bug Fixes
1. Revised the Note field reading process.

v1.2.4 - 2017/07/07: Bug Fixes
1. Fixed an issue where the escape status animation was active outside of Battle.

v1.2.3 - May 19, 2017: Bug Fixes
1. Fixed an issue where defensive motion priority was not being Reflectioned.

v1.2.2 - May 11, 2017: Deleted unnecessary code.
1. Deleted unnecessary log output.

v1.2.1 - May 10, 2017: Bug Fixes
1. Supports FTKR_FacialImageDifference.js

v1.2.0 - May 9, 2017: Traits Additions
1. Added the ability to set motions using different SV images.
2. Added the ability to individually set skill and item use motions.
3. Added the ability to set HP recovery motions.
4. Added a custom condition Traits to set custom conditions for status motions.

v1.1.5 - May 6, 2017: Bug Fixes
1. Fixed an issue where state motions would not be properly applied if the state motion tag was not set.

v1.1.4 - April 30, 2017: Bug Fixes
1. Fixed an issue where motion data was not being passed correctly to YED_SideviewBattler.

v1.1.3 - April 27, 2017: Bug Fixes and Added Traits
1. Fixed a bug related to requestMotion().
2. Added support for YED_SideviewBattler's custom battler set.
3. Added support for YEP_X_AnimatedSVEnemies' enemy motions.

v1.1.2 - April 27, 2017: Bug Fixes
1. Fixed an issue where state motions 10 and above were not being applied.

v1.1.1 - April 26, 2017: Support for YEP_BattleEngineCore

v1.1.0 - April 25, 2017: Specification changes and Traits additions
1. Added the ability to change action motions such as attacks.
2. Added motions for battle victory, escape, and near-death situations to state motions.
3. Revised default state motion settings.
4. Added the ability to combine multiple motions and display them consecutively.

v1.0.1 - April 21, 2017: Bug fixes
1. Fixed an issue where state tag settings were not being read correctly.

v1.0.0 - April 19, 2017: First version created

-----------------------------------------------------------------------------

@param --行動モーションの設定--
@text --Action motion settings--

@param Wait Motion
@desc Sets the waiting motion. Default: wait
@default wait

@param Damage Motion
@desc Set the damage motion Default damage
@default damage

@param Evade Motion
@desc Sets the evasion motion. Default: Evasion
@default evade

@param Thrust Motion
@desc Sets thrust motion Default thrust
@default thrust

@param Swing Motion
@desc Set the sweeping motion Default swing
@default swing

@param Missile Motion
@desc Sets the projectile motion. Default missile
@default missile

@param Skill Motion
@desc Sets the defensive use motion. Default skill
@default skill

@param Spell Motion
@desc Sets the magic use motion. Default spell
@default spell

@param Item Motion
@desc Set the item use motion Default item
@default item

@param Recovery Motion
@desc Set the motion when recovering HP

@param Undecided Motion
@desc Set the motion to display when the motion image is unknown: Default is walk
@default walk

@param --状態モーション1 設定--
@text --State Motion 1 Settings--

@param Motion 1 name
@desc Set the code for motion 1. Default is dying
@default dying

@param Motion 1 Condition
@desc Sets the state of motion 1. Default is dying
@default dying

@param --状態モーション2 設定--
@text --State Motion 2 Settings--

@param Motion 2 name
@desc Set the code for motion 2. Default: abnormal
@default abnormal

@param Motion 2 Condition
@desc Sets the state of motion 2. Default: state1
@default state1

@param --状態モーション3 設定--
@text --State Motion 3 Settings--

@param Motion 3 name
@desc Set the code for motion 3. Default guard
@default guard

@param Motion 3 Condition
@desc Set the state of motion 3. Default guard
@default guard

@param --状態モーション4 設定--
@text --State Motion 4 Settings--

@param Motion 4 name
@desc Set the chord for motion 4. Default: chant
@default chant

@param Motion 4 Condition
@desc Sets the state of motion 4. Default: chant
@default chant

@param --状態モーション5 設定--
@text --State Motion 5 Settings--

@param Motion 5 name
@desc Set the code for Motion 5. Default sleep
@default sleep

@param Motion 5 Condition
@desc Sets the state of motion 5. Default is state2
@default state2

@param --状態モーション6 設定--
@text --State Motion 6 Settings--

@param Motion 6 name
@desc Sets the code for motion 6. Default is dead
@default dead

@param Motion 6 Condition
@desc Sets the state of motion 6. Default is state3
@default state3

@param --状態モーション7 設定--
@text --State Motion 7 Settings--

@param Motion 7 name
@desc Set the chords for Motion 7.

@param Motion 7 Condition
@desc Sets the state of motion 7.

@param --状態モーション8 設定--
@text --State Motion 8 Settings--

@param Motion 8 name
@desc Set the chords for Motion 8.

@param Motion 8 Condition
@desc Sets the state of Motion 8.

@param --状態モーション9 設定--
@text --State Motion 9 Settings--

@param Motion 9 name
@desc Set the code for Motion 9. Default: walk
@default walk

@param Motion 9 Condition
@desc Sets the state of motion 9. Default input
@default input

@param --状態モーション10 設定--
@text --State Motion 10 Settings--

@param Motion 10 name
@desc Set the code for motion 10. Default: victory
@default victory

@param Motion 10 Condition
@desc Sets the state of motion 10. Default is victory
@default victory

@param --状態モーション11 設定--
@text --State Motion 11 Settings--

@param Motion 11 name
@desc Set the code for Motion 11. Default escape
@default escape

@param Motion 11 Condition
@desc Sets the state of motion 11. Default escape
@default escape

@param --状態モーション12 設定--
@text --State Motion 12 Settings--

@param Motion 12 name
@desc Set the code for motion 12.

@param Motion 12 Condition
@desc Sets the state of motion 12.

@param --状態モーション13 設定--
@text --State Motion 13 Settings--

@param Motion 13 name
@desc Set the code for motion 13.

@param Motion 13 Condition
@desc Set the state of motion 13.

@param --状態モーション14 設定--
@text --State Motion 14 Settings--

@param Motion 14 name
@desc Set the code for motion 14.

@param Motion 14 Condition
@desc Sets the state of motion 14.

@param --状態モーション15 設定--
@text --State Motion 15 Settings--

@param Motion 15 name
@desc Set the code for motion 15.

@param Motion 15 Condition
@desc Sets the state of motion 7.

@param --状態モーション16 設定--
@text --State Motion 16 Settings--

@param Motion 16 name
@desc Set the code for Motion 16.

@param Motion 16 Condition
@desc Sets the state of motion 7.
@default action

@param --カスタムモーション1 設定--
@text --Custom Motion 1 Settings--

@param Custom 1 Non Loop
@desc Set the code for the non-looping motion of Custom Motion 1.

@param Custom 1 Loop
@desc Set the code for the looping motion of Custom Motion 1.

@param --カスタムモーション2 設定--
@text --Custom Motion 2 Settings--

@param Custom 2 Non Loop
@desc Set the code for the non-looping motion of Custom Motion 2.

@param Custom 2 Loop
@desc Set the code for the looping motion of Custom Motion 2.

@param --カスタムモーション3 設定--
@text --Custom Motion 3 Settings--

@param Custom 3 Non Loop
@desc Set the code for the non-looping motion of Custom Motion 3.

@param Custom 3 Loop
@desc Set the code for the looping motion of Custom Motion 3.

@param --カスタムモーション4 設定--
@text --Custom Motion 4 Settings--

@param Custom 4 Non Loop
@desc Set the code for the non-looping motion of Custom Motion 4.

@param Custom 4 Loop
@desc Set the code for the looping motion of Custom Motion 4.

@param --カスタムモーション5 設定--
@text --Custom Motion 5 Settings--

@param Custom 5 Non Loop
@desc Set the code for the non-looping motion of Custom Motion 5.

@param Custom 5 Loop
@desc Set the code for the looping motion of Custom Motion 5.

@param --カスタムモーション6 設定--
@text --Custom Motion 6 Settings--

@param Custom 6 Non Loop
@desc Set the code for the non-looping motion of Custom Motion 6.

@param Custom 6 Loop
@desc Set the code for the looping motion of Custom Motion 6.

@param --カスタムモーション7 設定--
@text --Custom Motion 7 Settings--

@param Custom 7 Non Loop
@desc Set the code for the non-looping motion of Custom Motion 7.

@param Custom 7 Loop
@desc Set the code for the looping motion of Custom Motion 7.

@param --カスタムモーション8 設定--
@text --Custom Motion 8 Settings--

@param Custom 8 Non Loop
@desc Set the code for the non-looping motion of Custom Motion 8.

@param Custom 8 Loop
@desc Set the code for the looping motion of Custom Motion 8.

@param --カスタムコンディション 設定--
@text --Custom Condition Settings--

@param Custom Condition 1
@desc Set the conditions for Custom Condition 1.

@param Custom Condition 2
@desc Set the conditions for Custom Condition 2.

@param Custom Condition 3
@desc Set the conditions for Custom Condition 3.

@param Custom Condition 4
@desc Set the conditions for Custom Condition 4.

@param Custom Condition 5
@desc Set the conditions for Custom Condition 5.

@param -- 特殊 設定--
@text -- Special Settings --

@param Enabled Refresh In PartyCmd
@desc Do not refresh motion when a party command is issued. Enable this when using a plugin that skips party commands.
@default false
@type boolean
@on valid
@off invalid

@param -- デバッグ 設定--
@text -- Debug Settings --

@param Output Motion Log
@desc Param to output motion sprite information to the log. 1 - enable, 0 - disable
@default 0

@param Output Motion Pattern Log
@desc A function to output motion sprite pattern update information to the log. 1 - Enable, 0 - Disable
@default 0
*/

/*:ja
@plugindesc v1.4.0 SVキャラのモーションを拡張するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、アクターのさまざまな状態における
SVキャラのモーションを変更します。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. 他プラグインと組み合わせる場合
   当プラグインは以下のプラグインよりも下にしてください。
     YEP_BattleEngineCore
     YEP_X_AnimatedSVEnemies
     YED_SideviewBattler


-----------------------------------------------------------------------------
行動モーションの設定
-----------------------------------------------------------------------------
アクターの非ダメージ時や、攻撃時など行動時におけるモーション設定します。
設定できる行動モーションは以下の通りです。

待機、ダメージ、回避、突き、払い、飛び道具、スキル、魔法、アイテム

プラグインパラメータの行動モーションの設定で、以下のコード名から
指定してください。

モーションのコード
walk, wait, chant, guard, damage, evade, thrust, swing,
missile, skill, spell, item, escape, victory, dying,
abnormal, sleep, dead, custom*, other*

custom* はカスタムモーションです。(*は番号)

other* は別画像モーションです。(*は番号)


-----------------------------------------------------------------------------
スキル・アイテムに個別でモーションを設定
-----------------------------------------------------------------------------
スキル、アイテムのメモ欄に以下のタグを設定すると、待機時、使用時のモーションを
変更することができます。

<ESM モーション: name>
<ESM MOTION: name>
使用時のモーションを name に変更します。
name にはモーションのコードを設定してください。


<ESM 武器モーション>
<ESM WEAPON_MOTION>
このタグがあると、手持ちの武器付きのモーションになります。


<ESM 詠唱ON>
<ESM CHANT_ON>
このタグがあると、スキル実行待機中のモーションを詠唱モーションに設定できます。


<ESM 詠唱OFF>
<ESM CHANT_OFF>
このタグがあると、詠唱モーションをOFFに設定できます。
SV魔法スキルに設定したスキルであっても、詠唱モーションを実行しません。



-----------------------------------------------------------------------------
カスタムモーションについて
-----------------------------------------------------------------------------
custom* (* は数字)で指定するモーションは、本プラグインで新規に設定可能な
モーションです。

以下のプラグインパラメータで表示するモーションのコードを設定することで
複数のモーションを連続して表示させることができます。
カスタムモーションは、8個まで設定できます。

<Custom * Non Loop>
   :ここに設定したコードのモーションはループしません。
<Custom * Loop>
   :ここに設定したコードのモーションをループさせます。

モーションのコードは、カンマ(,)を使うことで複数入力できます。
これらのパラメータに、custom* を使用することはできません。


モーションのループについて
<Custom * Loop>に設定したモーションをループさせます。
複数のコードを入力した場合も、それらを順に表示してループします。
設定しない場合は、そのカスタムモーションはループしません。

設定例)
<Custom * Non Loop> :victory, skill
<Custom * Loop>     :item, walk
上記のように設定した場合、以下の順番でモーションを表示します。

victory ⇒ skill ⇒ item ⇒ walk ⇒ item ⇒ walk ⇒ ...
                 |→ここからループ


-----------------------------------------------------------------------------
別画像モーションについて
-----------------------------------------------------------------------------
other* (* は数字)で指定するモーションは、本プラグインで新規に設定可能な
アクター専用のモーションです。

データベースのアクターの「画像」設定で選択したSV戦闘キャラ画像以外の
画像を使用することができます。

使用する画像は、アクターのメモ欄に以下のタグで設定します。

<ESM_画像:filename>
<ESM_IMAGE:filename>

画像ファイル filename.png は img/sv_actors/ に保存してください。
使用できる画像規格は、SV戦闘キャラ画像と同じです。

other*の *番号は、画像内のどの位置のモーションを使用するか設定する番号です。
3枚で1セットで左上のモーションを0番、一つ下を1番、一つ右を6番として数えます。
other0 ~ other17 まで使用できます。

なお、各別画像モーションはループしません。


-----------------------------------------------------------------------------
状態モーションの設定
-----------------------------------------------------------------------------
アクターの以下の状態におけるモーション設定します。

 input   : コマンド入力中
 chant   : 詠唱中
 guard   : 防御中/防御待機中
 state*  : ステート付加中( * がステートモーション番号)(例:state4)
 victory : 戦闘勝利中
 escape  : 逃走中
 dying   : 瀕死時(残りHP25％以下)
 custom* : カスタムコンディション(* は番号)(例:custom1)
 action  : 行動モーション全般(モーション名は空欄)

モーションは、モーション1～モーション16まで設定できます。
数字が大きい方が、モーションの優先度が高くなります。

<Motion * Name>
   :モーション名のコードを指定してください。
   : walk, wait, chant, guard, damage, evade, thrust, swing,
   : missile, skill, spell, item, escape, victory, dying,
   : abnormal, sleep, dead, custom*, other*

<Motion * Condition>
   :モーションの状態。上記の9種類から設定してください。
   :状態モーションに設定したモーションは、ループします。(action除く)

※action を設定しない場合は、すべての行動モーションよりも優先が高くなります。


-----------------------------------------------------------------------------
ステートモーションの設定
-----------------------------------------------------------------------------
ステートのメモ欄に以下のタグを入力することで、ステート付加中のモーションを
設定できます。

<ESM モーション: x>
<ESM MOTION: x>
   :ステートモーション番号を x に設定します。
   :タグで設定しない場合は、基本設定の[SV]モーションの設定に従います。


<ESM モーション固定>
<ESM FIXED_MOTION>
   :ステート付与中のモーションの更新を無効にします。
   :例えば、防御モーション中にこのステートが付与されると、防御モーションで
   :固定され、以降このステートが解除されるまで何があっても防御モーションを
   :とり続けます。


-----------------------------------------------------------------------------
カスタムコンディションの設定
-----------------------------------------------------------------------------
状態モーションのプラグインパラメータ<Motion * Condition>に設定できる
独自条件を設定できます。

プラグインパラメータ<Custom Condition *> にJS条件式を入力してください。

[条件式 の値について]
条件式は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
使用することができます。以下のコードを使用できます。
 a.param - 使用者のパラメータを参照します。(a.hit で使用者の命中率)
 v[x]    - 変数ID x の値を参照します。
 s[x]    - スイッチID x の値を参照します。


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php


プラグイン公開元
https://github.com/futokoro/RPGMaker/blob/master/README.md


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.4.0 - 2019/04/13 : 機能追加
   1. 状態モーションの優先度に、行動モーション action の状態を設定する機能を追加。

v1.3.2 - 2019/03/10 : 機能追加
   1. パーティーコマンドをスキップするプラグインに対応するプラグインパラメータ
      Enabled Refresh In PartyCmd を追加。

v1.3.1 - 2018/05/31 : 不具合修正
   1. パーティーの誰かが防御を使用すると、パーティーメンバー全員が防御モーションを
      一瞬実行する不具合を修正。

v1.3.0 - 2018/05/22 : 機能追加
   1. 特定のステート付与中のモーションの更新を無効にする機能を追加。

v1.2.10 - 2018/04/29 : 不具合修正
   1. 状態モーションにループしないモーションを設定すると、エラーになる不具合を修正。

v1.2.9 - 2018/04/28 : 不具合修正
   1. デバッグ設定のログ表示を有効にすると、特定のモーション時にエラーになる
      不具合を修正。

v1.2.8 - 2018/04/28 : 不具合修正
   1. YEP_BattleEngineCore.jsと組み合わせている場合に、戦闘不能時の
      状態モーションの設定が反映されない不具合を修正。

v1.2.7 - 2018/04/12 : 不具合修正
   1. YEP_VictoryAftermath.jsと組み合わせた場合に、勝利モーションを実行しない
      不具合を修正。

v1.2.6 - 2018/04/10 : 不具合修正、機能追加
   1. YED_SideviewBattlerと組み合わせた場合に、3フレーム以外のモーションを
      表示できない不具合を修正。
   2. スキルに詠唱モーションを実行させるタグ付け機能を追加。

v1.2.5 - 2017/08/24 : 不具合修正
   1. メモ欄の読み取り処理を見直し。

v1.2.4 - 2017/07/07 : 不具合修正
   1. 状態モーションのescapeが、戦闘時以外でも有効になる不具合を修正。

v1.2.3 - 2017/05/19 : 不具合修正
   1. 防御モーションの優先度が反映されない不具合を修正。

v1.2.2 - 2017/05/11 : 不要な記述を削除
   1. 余計なログを出力する箇所を削除。

v1.2.1 - 2017/05/10 : 不具合修正
   1. FTKR_FacialImageDifference.jsに対応

v1.2.0 - 2017/05/09 : 機能追加
   1. 別のSV画像を使用したモーションを設定する機能を追加。
   2. スキル・アイテムの使用モーションを個別に設定する機能を追加。
   3. HP回復時のモーションを設定する機能を追加。
   4. 状態モーションに独自条件を設定するカスタムコンディションの機能を追加。

v1.1.5 - 2017/05/06 : 不具合修正
   1. ステートモーションタグが設定されていない場合に、ステートの
      モーションを正しく反映できない不具合を修正。

v1.1.4 - 2017/04/30 : 不具合修正
   1. YED_SideviewBattler側にモーションデータを正しく渡せていなかった
      不具合を修正。

v1.1.3 - 2017/04/27 : 不具合修正、機能追加
   1. requestMotion()に関する不具合修正。
   2. YED_SideviewBattlerのバトラーセットカスタムに対応。
   3. YEP_X_AnimatedSVEnemiesのエネミーモーションに対応。

v1.1.2 - 2017/04/27 : 不具合修正
   1. 状態モーション10 以降が反映されない不具合を修正。

v1.1.1 - 2017/04/26 : YEP_BattleEngineCoreに対応

v1.1.0 - 2017/04/25 : 仕様変更、機能追加
   1. 攻撃等の行動モーションを変更する機能を追加。
   2. 状態モーションに、戦闘勝利、逃走、瀕死時のモーションを追加。
   3. 状態モーションのデフォルト設定を見直し
   4. 複数のモーションを組み合わせて連続で表示する機能を追加。

v1.0.1 - 2017/04/21 : 不具合修正
   1. ステートのタグ設定が正しく読み取れない不具合を修正。

v1.0.0 - 2017/04/19 : 初版作成

-----------------------------------------------------------------------------

@param --行動モーションの設定--
@text --行動モーションの設定--

@param Wait Motion
@desc 待機モーションを設定します デフォルト wait
@default wait

@param Damage Motion
@desc ダメージモーションを設定します デフォルト damage
@default damage

@param Evade Motion
@desc 回避モーションを設定します デフォルト evade
@default evade

@param Thrust Motion
@desc 突きモーションを設定します デフォルト thrust
@default thrust

@param Swing Motion
@desc 払いモーションを設定します デフォルト swing
@default swing

@param Missile Motion
@desc 飛び道具モーションを設定します デフォルト missile
@default missile

@param Skill Motion
@desc 防御使用モーションを設定します デフォルト skill
@default skill

@param Spell Motion
@desc 魔法使用モーションを設定します デフォルト spell
@default spell

@param Item Motion
@desc アイテム使用モーションを設定します デフォルト item
@default item

@param Recovery Motion
@desc HP回復時のモーションを設定します

@param Undecided Motion
@desc モーション画像が不明な場合に表示するモーションを設定します : デフォルト walk
@default walk

@param --状態モーション1 設定--
@text --状態モーション1 設定--

@param Motion 1 name
@desc モーション1のコードを設定します。 デフォルト dying
@default dying

@param Motion 1 Condition
@desc モーション1の状態を設定します。 デフォルト dying
@default dying

@param --状態モーション2 設定--
@text --状態モーション2 設定--

@param Motion 2 name
@desc モーション2のコードを設定します。 デフォルト abnormal
@default abnormal

@param Motion 2 Condition
@desc モーション2の状態を設定します。 デフォルト state1
@default state1

@param --状態モーション3 設定--
@text --状態モーション3 設定--

@param Motion 3 name
@desc モーション3のコードを設定します。 デフォルト guard
@default guard

@param Motion 3 Condition
@desc モーション3の状態を設定します。 デフォルト guard
@default guard

@param --状態モーション4 設定--
@text --状態モーション4 設定--

@param Motion 4 name
@desc モーション4のコードを設定します。 デフォルト chant
@default chant

@param Motion 4 Condition
@desc モーション4の状態を設定します。 デフォルト chant
@default chant

@param --状態モーション5 設定--
@text --状態モーション5 設定--

@param Motion 5 name
@desc モーション5のコードを設定します。 デフォルト sleep
@default sleep

@param Motion 5 Condition
@desc モーション5の状態を設定します。 デフォルト state2
@default state2

@param --状態モーション6 設定--
@text --状態モーション6 設定--

@param Motion 6 name
@desc モーション6のコードを設定します。 デフォルト dead
@default dead

@param Motion 6 Condition
@desc モーション6の状態を設定します。 デフォルト state3
@default state3

@param --状態モーション7 設定--
@text --状態モーション7 設定--

@param Motion 7 name
@desc モーション7のコードを設定します。

@param Motion 7 Condition
@desc モーション7の状態を設定します。

@param --状態モーション8 設定--
@text --状態モーション8 設定--

@param Motion 8 name
@desc モーション8のコードを設定します。

@param Motion 8 Condition
@desc モーション8の状態を設定します。

@param --状態モーション9 設定--
@text --状態モーション9 設定--

@param Motion 9 name
@desc モーション9のコードを設定します。 デフォルト walk
@default walk

@param Motion 9 Condition
@desc モーション9の状態を設定します。 デフォルト input
@default input

@param --状態モーション10 設定--
@text --状態モーション10 設定--

@param Motion 10 name
@desc モーション10のコードを設定します。 デフォルト victory
@default victory

@param Motion 10 Condition
@desc モーション10の状態を設定します。 デフォルト victory
@default victory

@param --状態モーション11 設定--
@text --状態モーション11 設定--

@param Motion 11 name
@desc モーション11のコードを設定します。 デフォルト escape
@default escape

@param Motion 11 Condition
@desc モーション11の状態を設定します。 デフォルト escape
@default escape

@param --状態モーション12 設定--
@text --状態モーション12 設定--

@param Motion 12 name
@desc モーション12のコードを設定します。

@param Motion 12 Condition
@desc モーション12の状態を設定します。

@param --状態モーション13 設定--
@text --状態モーション13 設定--

@param Motion 13 name
@desc モーション13のコードを設定します。

@param Motion 13 Condition
@desc モーション13の状態を設定します。

@param --状態モーション14 設定--
@text --状態モーション14 設定--

@param Motion 14 name
@desc モーション14のコードを設定します。

@param Motion 14 Condition
@desc モーション14の状態を設定します。

@param --状態モーション15 設定--
@text --状態モーション15 設定--

@param Motion 15 name
@desc モーション15のコードを設定します。

@param Motion 15 Condition
@desc モーション7の状態を設定します。

@param --状態モーション16 設定--
@text --状態モーション16 設定--

@param Motion 16 name
@desc モーション16のコードを設定します。

@param Motion 16 Condition
@desc モーション7の状態を設定します。
@default action

@param --カスタムモーション1 設定--
@text --カスタムモーション1 設定--

@param Custom 1 Non Loop
@desc カスタムモーション1のループしないモーションのコードを設定します。

@param Custom 1 Loop
@desc カスタムモーション1のループするモーションのコードを設定します。

@param --カスタムモーション2 設定--
@text --カスタムモーション2 設定--

@param Custom 2 Non Loop
@desc カスタムモーション2のループしないモーションのコードを設定します。

@param Custom 2 Loop
@desc カスタムモーション2のループするモーションのコードを設定します。

@param --カスタムモーション3 設定--
@text --カスタムモーション3 設定--

@param Custom 3 Non Loop
@desc カスタムモーション3のループしないモーションのコードを設定します。

@param Custom 3 Loop
@desc カスタムモーション3のループするモーションのコードを設定します。

@param --カスタムモーション4 設定--
@text --カスタムモーション4 設定--

@param Custom 4 Non Loop
@desc カスタムモーション4のループしないモーションのコードを設定します。

@param Custom 4 Loop
@desc カスタムモーション4のループするモーションのコードを設定します。

@param --カスタムモーション5 設定--
@text --カスタムモーション5 設定--

@param Custom 5 Non Loop
@desc カスタムモーション5のループしないモーションのコードを設定します。

@param Custom 5 Loop
@desc カスタムモーション5のループするモーションのコードを設定します。

@param --カスタムモーション6 設定--
@text --カスタムモーション6 設定--

@param Custom 6 Non Loop
@desc カスタムモーション6のループしないモーションのコードを設定します。

@param Custom 6 Loop
@desc カスタムモーション6のループするモーションのコードを設定します。

@param --カスタムモーション7 設定--
@text --カスタムモーション7 設定--

@param Custom 7 Non Loop
@desc カスタムモーション7のループしないモーションのコードを設定します。

@param Custom 7 Loop
@desc カスタムモーション7のループするモーションのコードを設定します。

@param --カスタムモーション8 設定--
@text --カスタムモーション8 設定--

@param Custom 8 Non Loop
@desc カスタムモーション8のループしないモーションのコードを設定します。

@param Custom 8 Loop
@desc カスタムモーション8のループするモーションのコードを設定します。

@param --カスタムコンディション 設定--
@text --カスタムコンディション 設定--

@param Custom Condition 1
@desc カスタムコンディション1の条件を設定します。

@param Custom Condition 2
@desc カスタムコンディション2の条件を設定します。

@param Custom Condition 3
@desc カスタムコンディション3の条件を設定します。

@param Custom Condition 4
@desc カスタムコンディション4の条件を設定します。

@param Custom Condition 5
@desc カスタムコンディション5の条件を設定します。

@param -- 特殊 設定--
@text -- 特殊 設定--

@param Enabled Refresh In PartyCmd
@desc パーティーコマンド時にモーションをリフレッシュさせない。 パーティーコマンドをスキップするプラグイン使用時に有効にする
@default false
@type boolean
@on 有効
@off 無効

@param -- デバッグ 設定--
@text -- デバッグ 設定--

@param Output Motion Log
@desc モーションスプライト情報をログに出力する機能 1 - 有効にする, 0 - 無効にする
@default 0

@param Output Motion Pattern Log
@desc モーションスプライトのパターン更新情報をログに出力する機能 1 - 有効にする, 0 - 無効にする
@default 0
*/

//=============================================================================

(function () {

    var paramParse = function (obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    var paramReplace = function (key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExSvMotion');

    FTKR.ESM.skipPartyOn = paramParse(parameters['Enabled Refresh In PartyCmd']) || false;
    FTKR.ESM.motion = {
        debug: {
            enable: Number(parameters['Output Motion Log'] || 0),
            pattern: Number(parameters['Output Motion Pattern Log'] || 0),
        },
        basic: {
            damage: String(parameters['Damage Motion'] || ''),
            evade: String(parameters['Evade Motion'] || ''),
            thrust: String(parameters['Thrust Motion'] || ''),
            swing: String(parameters['Swing Motion'] || ''),
            missile: String(parameters['Missile Motion'] || ''),
            skill: String(parameters['Skill Motion'] || ''),
            speed: String(parameters['Spell Motion'] || ''),
            item: String(parameters['Item Motion'] || ''),
            undecided: String(parameters['Undecided Motion'] || ''),
            wait: String(parameters['Wait Motion'] || ''),
            recovery: String(parameters['Recovery Motion'] || ''),
        },
        state: [
            { name: '', condition: '', },
            {
                name: String(parameters['Motion 1 name'] || ''),
                condition: String(parameters['Motion 1 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 2 name'] || ''),
                condition: String(parameters['Motion 2 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 3 name'] || ''),
                condition: String(parameters['Motion 3 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 4 name'] || ''),
                condition: String(parameters['Motion 4 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 5 name'] || ''),
                condition: String(parameters['Motion 5 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 6 name'] || ''),
                condition: String(parameters['Motion 6 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 7 name'] || ''),
                condition: String(parameters['Motion 7 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 8 name'] || ''),
                condition: String(parameters['Motion 8 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 9 name'] || ''),
                condition: String(parameters['Motion 9 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 10 name'] || ''),
                condition: String(parameters['Motion 10 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 11 name'] || ''),
                condition: String(parameters['Motion 11 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 12 name'] || ''),
                condition: String(parameters['Motion 12 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 13 name'] || ''),
                condition: String(parameters['Motion 13 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 14 name'] || ''),
                condition: String(parameters['Motion 14 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 15 name'] || ''),
                condition: String(parameters['Motion 15 Condition'] || ''),
            },
            {
                name: String(parameters['Motion 16 name'] || ''),
                condition: String(parameters['Motion 16 Condition'] || ''),
            },
        ],
        custom: [
            ['', ''],
            [String(parameters['Custom 1 Non Loop'] || ''),
            String(parameters['Custom 1 Loop'] || '')],
            [String(parameters['Custom 2 Non Loop'] || ''),
            String(parameters['Custom 2 Loop'] || '')],
            [String(parameters['Custom 3 Non Loop'] || ''),
            String(parameters['Custom 3 Loop'] || '')],
            [String(parameters['Custom 4 Non Loop'] || ''),
            String(parameters['Custom 4 Loop'] || '')],
            [String(parameters['Custom 5 Non Loop'] || ''),
            String(parameters['Custom 5 Loop'] || '')],
            [String(parameters['Custom 6 Non Loop'] || ''),
            String(parameters['Custom 6 Loop'] || '')],
            [String(parameters['Custom 7 Non Loop'] || ''),
            String(parameters['Custom 7 Loop'] || '')],
            [String(parameters['Custom 8 Non Loop'] || ''),
            String(parameters['Custom 8 Loop'] || '')],
        ],
        condition: [
            '',
            String(parameters['Custom Condition 1'] || ''),
            String(parameters['Custom Condition 2'] || ''),
            String(parameters['Custom Condition 3'] || ''),
            String(parameters['Custom Condition 4'] || ''),
            String(parameters['Custom Condition 5'] || ''),
        ],
    };

    Game_BattlerBase.ESM_MOTION_NUMBER = 16;

    //objのメモ欄から <metacode: x> の値を読み取って配列で返す
    var readObjectMeta = function (obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function (metacode) {
            var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        });
        return match ? match[1] : '';
    };

    //objのメモ欄から <metacode> があるか真偽を返す
    var testObjectMeta = function (obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function (metacode) {
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        });
    };

    //=============================================================================
    // 自作関数(グローバル)
    //=============================================================================

    FTKR.gameData = FTKR.gameData || {
        user: null,
        target: null,
        item: null,
        number: 0,
    };

    if (!FTKR.setGameData) {
        FTKR.setGameData = function (user, target, item, number) {
            FTKR.gameData = {
                user: user || null,
                target: target || null,
                item: item || null,
                number: number || 0
            };
        };
    }

    if (!FTKR.evalFormula) {
        FTKR.evalFormula = function (formula) {
            var datas = FTKR.gameData;
            try {
                var s = $gameSwitches._data;
                var v = $gameVariables._data;
                var a = datas.user;
                var b = datas.target;
                var item = datas.item;
                var number = datas.number;
                if (b) var result = b.result();
                var value = eval(formula);
                if (isNaN(value)) value = 0;
                return value;
            } catch (e) {
                console.error(e);
                return 0;
            }
        };
    }

    //=============================================================================
    // 基本モーションの設定を変更
    //=============================================================================

    var _ESM_Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function () {
        _ESM_Game_Battler_onBattleStart.call(this);
        this._requestVictory = false;
        this._requestEscape = false;
    };

    //書き換え
    if (!Imported.YEP_BattleEngineCore) {
        Game_Battler.prototype.requestMotion = function (motionType) {
            if (!this.checkActionPriority()) return;
            var motion = FTKR.ESM.motion.basic[motionType];
            this._motionType = motion ? motion : motionType;
        };
    }

    Game_Actor.prototype.performRecovery = function () {
        Game_Battler.prototype.performRecovery.call(this);
        this.requestMotion(FTKR.ESM.motion.basic.recovery);
    };

    //書き換え
    Game_Actor.prototype.performVictory = function () {
        if (this.canMove()) {
            this._requestVictory = true;
            this.requestMotion('refresh');
        }
    };

    //書き換え
    Game_Actor.prototype.performEscape = function () {
        if (this.canMove()) {
            this._requestEscape = true;
            this.requestMotion('refresh');
        }
    };

    //書き換え
    Game_Actor.prototype.performAction = function (action) {
        Game_Battler.prototype.performAction.call(this, action);
        if (action.isAttack()) {
            this.performAttack();
        } else if (action.isGuard()) {
            this.requestMotion('refresh');
            //        this.requestMotion('guard');
        } else if (action.isMagicSkill()) {
            var motion = this.esmMotion(action.item(), 'spell');
            this.requestMotion(motion);
        } else if (action.isSkill()) {
            var motion = this.esmMotion(action.item(), 'skill');
            this.requestMotion(motion);
        } else if (action.isItem()) {
            var motion = this.esmMotion(action.item(), 'item');
            this.requestMotion(motion);
        }
        if (motion && testObjectMeta(action.item(), ['ESM 武器モーション', 'ESM WEAPON_MOTION'])) {
            var weapons = this.weapons();
            var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
            var attackMotion = $dataSystem.attackMotions[wtypeId];
            if (attackMotion) {
                this.startWeaponAnimation(attackMotion.weaponImageId);
            }
        }
    };

    Game_Actor.prototype.esmMotion = function (item, motion) {
        return readObjectMeta(item, ['ESM モーション', 'ESM MOTION']) || motion;
    }

    var _ESM_Game_Action_isMagicSkill = Game_Action.prototype.isMagicSkill;
    Game_Action.prototype.isMagicSkill = function () {
        if (testObjectMeta(this.item(), ['ESM 詠唱ON', 'ESM CHANT_ON'])) {
            return true;
        } else if (testObjectMeta(this.item(), ['ESM 詠唱OFF', 'ESM CHANT_OFF'])) {
            return false;
        } else {
            return _ESM_Game_Action_isMagicSkill.call(this);
        }
    };

    //=============================================================================
    // バトラーの状態からモーション名を取得する
    // Game_BattlerBase
    //=============================================================================

    Game_BattlerBase.prototype.getEsmMotion = function () {
        var index = this.checkConditionAll();
        if (index) {
            return FTKR.ESM.motion.state[index].name;
        } else if (this.isUndecided()) {
            return FTKR.ESM.motion.basic.undecided;
        } else {
            return FTKR.ESM.motion.basic.wait;
        }
    };

    Game_BattlerBase.prototype.checkActionPriority = function () {
        var priority = 16;
        for (var i = Game_BattlerBase.ESM_MOTION_NUMBER; i > 0; i--) {
            if (FTKR.ESM.motion.state[i].condition.toUpperCase() === "ACTION") {
                priority = i;
                break;
            }
        }
        return priority > this.checkConditionAll();
    };

    Game_BattlerBase.prototype.checkConditionAll = function () {
        for (var i = Game_BattlerBase.ESM_MOTION_NUMBER; i > 0; i--) {
            if (this.checkCondition(FTKR.ESM.motion.state[i].condition)) {
                return i;
            }
        }
        return 0;
    };

    Game_BattlerBase.prototype.checkCondition = function (condition) {
        var stateMotion = this.stateMotionIndex();
        if (condition.match(/state(\d+)/i)) {
            return stateMotion === Number(RegExp.$1);
        } else if (condition.match(/custom(\d+)/i)) {
            return this.evalEsmCondition(Number(RegExp.$1));
        }
        switch (true) {
            case /input/i.test(condition):
                return this.isInputting() || this.isActing();
            case /guard/i.test(condition):
                return this.isGuardMotion();
            case /chant/i.test(condition):
                return this.isChanting();
            case /victory/i.test(condition):
                return $gameParty.inBattle() && $gameTroop.isAllDead() && this._requestVictory;
            case /escape/i.test(condition):
                return $gameParty.inBattle() && BattleManager.isEscaped() && this._requestEscape;
            case /dying/i.test(condition):
                return this.isDying();
            default:
                return false;
        };
    };

    Game_BattlerBase.prototype.isGuardMotion = function () {
        return this.isGuard() || this.isGuardWaiting() ||
            (!!BattleManager._subject && BattleManager._subject === this &&
                !!BattleManager._action && BattleManager._action.isGuard());
    };

    Game_BattlerBase.prototype.evalEsmCondition = function (number) {
        FTKR.setGameData(this, null, null);
        return FTKR.evalFormula(FTKR.ESM.motion.condition[number]);
    };

    //書き換え
    var _ESM_Game_BattlerBase_stateMotionIndex = Game_BattlerBase.prototype.stateMotionIndex;
    Game_BattlerBase.prototype.stateMotionIndex = function () {
        if (this.isEnemy() && !FTKR.ESM.enableEnemyMotion) {
            return _ESM_Game_BattlerBase_stateMotionIndex.call(this);
        }
        var states = this.states();
        if (states.length > 0) {
            var motion = readObjectMeta(states[0], ['ESM モーション', 'ESM MOTION']);
            return motion ? Number(motion) : states[0].motion;
        } else {
            return 0;
        }
    };

    Game_Battler.prototype.isFixedMotion = function () {
        var states = this.states();
        if (states.length > 0) {
            return states.some(function (state) {
                return testObjectMeta(state, ['ESM モーション固定', 'ESM FIXED_MOTION']);
            });
        } else {
            return false;
        }
    };

    //=============================================================================
    // Sprite_Weapon
    // 武器のSVスプライトを修正
    //=============================================================================

    var _ESM_Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
    Sprite_Weapon.prototype.setup = function (weaponImageId) {
        _ESM_Sprite_Weapon_setup.call(this, weaponImageId);
        this.consoleLog_weaponMotion('setup');
    };

    Sprite_Weapon.prototype.consoleLog_weaponMotion = function (text) {
        if (FTKR.ESM.motion.debug.enable && this._weaponImageId) {
            console.log('********************************************');
            console.log('Weapon Motion <', text, '>');
            console.log('---------------------------');
            console.log('ImageID :', this._weaponImageId);
            console.log('pattern :', this._pattern);
            console.log('********************************************');
        }
    };

    //=============================================================================
    // バトラーの拡張モーション機能を追加
    // Sprite_Battler
    //=============================================================================

    var _ESM_Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function () {
        _ESM_Sprite_Battler_initMembers.call(this);
        this._motionIndex = 0;
        this._motionTypes = [[], []];
        this._motionType = '';
        this._index = 0;
        this._otherFile = false;
    };

    Sprite_Battler.ESM_MOTIONS = {
        walk: ['', 'walk'],
        wait: ['', 'wait'],
        chant: ['', 'chant'],
        guard: ['', 'guard'],
        damage: ['damage', ''],
        evade: ['evade', ''],
        thrust: ['thrust', ''],
        swing: ['swing', ''],
        missile: ['missile', ''],
        skill: ['skill', ''],
        spell: ['spell', ''],
        item: ['item', ''],
        escape: ['', 'escape'],
        victory: ['', 'victory'],
        dying: ['', 'dying'],
        abnormal: ['', 'abnormal'],
        sleep: ['', 'sleep'],
        dead: ['', 'dead'],
    };

    Sprite_Battler.ESM_MOTION_NAME = [
        'walk',
        'wait',
        'chant',
        'guard',
        'damage',
        'evade',
        'thrust',
        'swing',
        'missile',
        'skill',
        'spell',
        'item',
        'escape',
        'victory',
        'dying',
        'abnormal',
        'sleep',
        'dead'
    ];

    Sprite_Battler.prototype.motion = function () {
        return Sprite_Actor.MOTIONS[this.convertOtherMotion(this.motionName())];
    };

    Sprite_Battler.prototype.convertOtherMotion = function (other) {
        return other && other.match(/other(\d+)/) ? Sprite_Battler.ESM_MOTION_NAME[Number(RegExp.$1)] : other;
    };

    Sprite_Battler.prototype.isOtherMotion = function () {
        return /other/i.test(this.motionName());
    };

    Sprite_Battler.prototype.motionTypes = function () {
        return this._motionTypes;
    };

    Sprite_Battler.prototype.motions = function () {
        return this._motionTypes[this._motionIndex];
    };

    Sprite_Battler.prototype.hasLoopMotions = function () {
        return !!this.motionTypes() && !!this.motionTypes()[1] && !!this.motionTypes()[1][0];
    };

    Sprite_Battler.prototype.motionName = function () {
        return this._motionTypes[this._motionIndex][this._index];
    };

    Sprite_Battler.prototype.lastMotionType = function () {
        return this.motions().length === 1 || this.motions().length <= this._index + 1;
    };

    if (!Imported.YED_SideviewBattler) {
        Sprite_Battler.prototype.motionFrames = function () {
            return 3;
        };
    }

    Sprite_Battler.prototype.setNewMotion = function (battler, motionType) {
        if (battler.isFixedMotion()) return;
        if (!motionType || motionType === 'refresh') {
            motionType = battler.getEsmMotion();
        }
        if (this._motionType === motionType) return;
        this._motionType = motionType;
        battler._faceType = motionType;
        this._otherFile = false;
        if (motionType.match(/custom(\d+)/)) {
            var newMotions = FTKR.ESM.motion.custom[Number(RegExp.$1)];
        } else if (motionType.match(/other(\d+)/)) {
            var newMotions = [motionType, ''];
        } else {
            var newMotions = Sprite_Battler.ESM_MOTIONS[motionType];
        }
        this._motionTypes = newMotions.map(function (motions) {
            return motions.split(',');
        });
        this._motionIndex = this.motionTypes()[0][0] ? 0 : 1;
        this._motionCount = 0;
        this._pattern = 0;
        this._index = 0;
        this._motion = this.motion();
        this.consoleLog_BattlerMotion('start')
        this.consoleLog_BattlerMotion('data')
    };

    Sprite_Battler.prototype.esmUpdateMotionCount = function (battler) {
        if (battler.isFixedMotion()) return;
        if (this.motion() && ++this._motionCount >= this.motionSpeed()) {
            if (Imported.YED_SideviewBattler) this._motionName = this.motionName();
            var frames = this.motionFrames();
            var loopFrames = Imported.YED_SideviewBattler && battler.isSideviewBattler() ? frames : frames + 1;
            // ループする場合
            if (this._motionIndex && this.motions().length <= 1) {
                this._pattern = (this._pattern + 1) % loopFrames;
                this.consoleLog_BattlerMotion('pattern')
                // ループしない場合 パターンを増やす
            } else if (this._pattern < frames - 1) {
                this._pattern++;
                this.consoleLog_BattlerMotion('pattern')
                // ループしない場合 パターンをリセット
            } else {
                this.esmUpdateRefreshMotion(battler);
            }
            this._motionCount = 0;
        }
    };

    Sprite_Battler.prototype.esmUpdateRefreshMotion = function (battler) {
        if (battler.isFixedMotion()) return;
        var condition = battler.getEsmMotion();
        this.consoleLog_BattlerMotion('refresh', [condition])
        if (this._motionType === condition) {
            if (!this._index && !this._pattern) {
                //index の更新
            } else if (!this.lastMotionType()) {
                this._pattern = 0;
                this._index++;
                //motionIndex の更新、index のリセット
            } else {
                if (!this._motionIndex && this.hasLoopMotions()) this._motionIndex = 1;
                this._index = 0;
                this._pattern = 0;
            }
            this._motion = this.motion();
            this.consoleLog_BattlerMotion('data');
            //condition の更新
        } else {
            this._motionIndex = 0;
            this._index = 0;
            this.startMotion(condition);
        }
    };

    Sprite_Battler.prototype.esmRefreshMotion = function (battler) {
        if (battler.isFixedMotion()) return;
        if (FTKR.ESM.skipPartyOn && BattleManager.isInputting() && !BattleManager.actor()) return;
        var condition = battler.getEsmMotion();
        this.consoleLog_BattlerMotion('refresh', [condition])
        //condition の更新
        if (this._motionType !== condition) {
            this._motionIndex = 0;
            this._index = 0;
            this.startMotion(condition);
        }
    };

    Sprite_Battler.prototype.consoleLog_BattlerMotion = function (type, datas) {
        if (FTKR.ESM.motion.debug.enable) {
            if (!FTKR.ESM.motion.debug.pattern && type === 'pattern') return;
            var name = !!this._battler ? this._battler.name() : '';
            console.log('********************************************');
            console.log('Actor motion <', type, '>', name);
            console.log('---------------------------');
            switch (type) {
                case 'start':
                    console.log('Input Motion   :', this._motionType);
                    console.log('motionTypes[0] : ' + this.motionTypes()[0]);
                    console.log('motionTypes[1] : ' + this.motionTypes()[1]);
                    break;
                case 'refresh':
                    console.log('motionType :', this._motionType);
                    console.log('condition  :', datas[0]);
                    var num = !!this.motions() ? this.motions().length : 0;
                    console.log('motion num :', num)
                    if (this._motionType !== datas[0]) {
                        console.log('⇒ Start Motion');
                    }
                    break;
                case 'data':
                    console.log('Motion Name  :', this.motionName());
                    var index = !!this.motion() ? this.motion().index : 0;
                    console.log('Motion Index :', index);
                    console.log('Type Index   :', this._motionIndex);
                    console.log('index        :', this._index);
                    break;
                case 'pattern':
                    console.log('Motion Name :', this.motionName());
                    console.log('Type Index  :', this._motionIndex);
                    console.log('index       :', this._index);
                    console.log('pattern     :', this._pattern);
                    break;
            }
            console.log('********************************************');
        }
    };

    //=============================================================================
    // Sprite_Actor
    // アクターのSVスプライトを修正
    //=============================================================================

    var _ESM_Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
    Sprite_Actor.prototype.updateBitmap = function () {
        if (this.isOtherMotion()) {
            Sprite_Battler.prototype.updateBitmap.call(this);
            var name = this.otherBattlerName();
            if (this._battlerName !== name) {
                this._battlerName = name;
                this._mainSprite.bitmap = ImageManager.loadSvActor(name);
            }
        } else {
            _ESM_Sprite_Actor_updateBitmap.call(this);
        }
    };

    Sprite_Actor.prototype.otherBattlerName = function () {
        return readObjectMeta(this._actor.actor(), ['ESM_画像', 'ESM_IMAGE']);
    };

    //書き換え
    Sprite_Actor.prototype.updateMotionCount = function () {
        this.esmUpdateMotionCount(this._actor);
    };

    //書き換え
    Sprite_Actor.prototype.refreshMotion = function () {
        var actor = this._actor;
        if (actor) {
            this.esmRefreshMotion(actor);
        }
    };

    //書き換え
    Sprite_Actor.prototype.startMotion = function (motionType) {
        if (this._motionType !== motionType) {
            this.setNewMotion(this._actor, motionType);
        }
    };


    //=============================================================================
    // 他プラグインの修正
    //=============================================================================
    //-----------------------------------------------------------------
    // YEP_BattleEngineCoreの修正
    //-----------------------------------------------------------------
    if (Imported.YEP_BattleEngineCore) {

        Game_Battler.prototype.idleMotion = function () {
            return '';
        };

        Game_Battler.prototype.deadMotion = function () {
            return '';
        };

        Game_Battler.prototype.sleepMotion = function () {
            return '';
        };

        Game_Battler.prototype.chantMotion = function () {
            return '';
        };

        Game_Battler.prototype.guardMotion = function () {
            return '';
        };

        Game_Battler.prototype.abnormalMotion = function () {
            return '';
        };

        Game_Battler.prototype.dyingMotion = function () {
            return '';
        };

        Game_Battler.prototype.waitMotion = function () {
            return '';
        };

        var _ESM_Game_Battler_requestMotionRefresh = Game_Battler.prototype.requestMotionRefresh;
        Game_Battler.prototype.requestMotionRefresh = function () {
            if (this._motionType) {
                if (this.checkActionPriority()) {
                    this.requestMotion(this._motionType);
                }
                this.clearMotion();
                return;
            }
            _ESM_Game_Battler_requestMotionRefresh.call(this);
        };

        Sprite_Battler.prototype.checkBattleInputActorUndecided = function (battler) {
            return battler.isUndecided();
        };

        //書き換え
        Sprite_Actor.prototype.forceMotion = function (motionType) {
            this.setNewMotion(this._actor, motionType);
        };

    }//Imported.YEP_BattleEngineCore

    //-----------------------------------------------------------------
    // (YEP_X_AnimatedSVEnemiesの修正)
    //-----------------------------------------------------------------
    if (Imported.YEP_X_AnimatedSVEnemies) {

        //書き換え
        Sprite_Enemy.prototype.updateMotionCount = function () {
            if (!this._svBattlerEnabled) return;
            this.esmUpdateMotionCount(this._enemy);
        };

        //書き換え
        Sprite_Enemy.prototype.refreshMotion = function () {
            if (!this._svBattlerEnabled) return;
            var enemy = this._enemy;
            if (!enemy) return;
            this.esmRefreshMotion(enemy);
        };

        //書き換え
        Sprite_Enemy.prototype.startMotion = function (motionType) {
            if (!this._svBattlerEnabled) return;
            if (this._motionType !== motionType) {
                this.setNewMotion(this._enemy, motionType);
            }
        };

    }//Imported.YEP_X_AnimatedSVEnemies

    //-----------------------------------------------------------------
    // YED_SideviewBattlerの修正
    //-----------------------------------------------------------------
    if (Imported.YED_SideviewBattler) {

        //書き換え
        Sprite_Actor.prototype.getCurrentMotion = function () {
            //        console.log(this.motionTypes(), this.motions(), this._motionIndex, this._index, this.motionName());
            return this._actor.getSideviewMotion(this.motionName());
        };

        //書き換え
        Sprite_Enemy.prototype.getCurrentMotion = function () {
            return this._enemy.getSideviewMotion(this.motionName());
        };

    }//Imported.ED_SideviewBattler

}());//EOF