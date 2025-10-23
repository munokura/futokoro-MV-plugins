//=============================================================================
// アイテムボックスにサブコマンドを追加するプラグイン
// FTKR_ItemSubCommand.js
// 作成者     : フトコロ
// プラグインNo : 43
// 作成日     : 2017/06/04
// 最終更新日 : 2020/01/05
// バージョン : v1.7.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ISC = true;

var FTKR = FTKR || {};
FTKR.ISC = FTKR.ISC || {};
/*:
@plugindesc v1.7.3 Add subcommands to the item box
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
By implementing this plugin, you can display subcommands after selecting an item and select their execution.

Subcommands include the following:
1. Use - Uses an item. If unavailable, this option is grayed out.
2. Discard - Discards an item. "Key Item" items cannot be discarded.
3. Equip - If the item is a weapon or armor, equips it to an actor.
Opens the actor selection screen and selects the target to equip.
4. Quit - Closes the subcommand.
5. Custom - Executes a common event set in the plugin parameters.

-----------------------------------------------------------------------------
Settings
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

-----------------------------------------------------------------------------
Setting the subcommands to display
-----------------------------------------------------------------------------
Set the commands to display in the plugin parameter <Command List>.
Enter the command codes you want to display, separated by commas (,).
The commands will be displayed in the order you entered them. (All lowercase)

<Code>
use	
discard	
equip	
cancel	
custom* (* represents the custom command number)

Example:
use,discard,custom0,cancel

-----------------------------------------------------------------------------
Discarding Items
-----------------------------------------------------------------------------
Executing the "Discard" subcommand lets you set the number of items to discard.
Once you've decided on the number, a confirmation screen will appear.
By selecting "Execute," you can discard the items.
The sound effect when discarding can be configured using the plugin parameters.

The confirmation screen can be hidden using the plugin parameter <Enable Confirmation>.

Entering the following tags in an item's Note field will prevent it from being discarded.

<NOT_DISCARDABLE>

Also, if you add a number after the tag, the item cannot be discarded while the switch with that ID is ON.

<NOT_DISCARDABLE: x>
x: Switch ID

-----------------------------------------------------------------------------
Equip an Item
---------------------------------------------------------------------------
When you execute the "Equip" subcommand, if the selected item is a weapon or armor, you can select an actor and change the equipment.

This subcommand will not appear in the subcommand window if an item other than a weapon or armor is selected.

Caution!
The equipment slot is automatically determined by the item's equipment type.
This may not work correctly if other plugins allow multiple items of the same equipment type to be equipped.

----------------------------------------------------------------------------
Custom Command
----------------------------------------------------------------------------
You can set a custom command to execute any common event.
Add the set command to the plugin parameter <Command List>.

Command Name
Set using the plugin parameter <Custom* Format>.

Common Event ID to Execute
Set this using the plugin parameter <Custom* EventID>.
You can also set the common event ID to execute for each item. (*1)
If both plugin parameters and individual item settings exist,
the item settings take priority.

Display Condition: Conditions for displaying in the subcommand window
You can set the plugin parameter <Custom* Show Condition> and
individual item conditions (*1).
Enter a conditional expression in script format (*2).
If not set, the event will not be displayed.
If both plugin parameters and individual item settings exist,
the event will only be displayed if both conditions are met.

Enabled Condition: Conditions for executing the subcommand window
You can set the plugin parameter <Custom* Enabled Condition> and
individual item conditions (*1).
Enter a conditional expression in script format (*2).
If not set, the event will not be executed.
If both plugin parameters and individual item settings exist,
the event will only be executed if both conditions are met.

(*1) How to Set Individual Conditions for Each Item
You can set conditions for each item by entering the following tags in the Note field.
<Custom Command: x>
Display Condition: Condition Expression
Enabling Condition: Condition Expression
Common Event ID: y
</Custom Command>
x: Custom Command Number
y: Common Event ID to execute

(*2) How to Enter Condition Expressions
Like damage calculation formulas, you can use non-fixed values by entering a script-style formula.
The following code can be used:
item - References the item data to be used. (item.id is the item ID)
number - References the number of items in possession to be used.
v[x] - References the value of variable ID x.
s[x] - References the value of switch ID x.
true - Always enabled.

-----------------------------------------------------------------------------
Example scripts that can be used in condition expressions
-----------------------------------------------------------------------------
1. Determine the item type (item, weapon, or armor)

DataManager.isWeapon(item) : The selected item is a weapon.
DataManager.isArmor(item) : The selected item is armor.
DataManager.isItem(item) : The selected item is an item.

2. Obtain the number of items owned for the selected item.

$gameParty.numItems(item)

-----------------------------------------------------------------------------
License for this plugin
----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2019 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin Publisher
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.7.3 - 2020/01/05: Bug Fixes
1. Fixed a bug that caused an error when discarding an item due to the plugin parameter "Discard Sound" not being correctly read.

v1.7.2 - 2019/12/25: Fixed the standard parameter display settings.
v1.7.1 - 2019/12/25: Added Traits
1. Added the ability to change the target and order of parameters displayed when changing equipment.

v1.7.0 - 2019/12/22: Traits Added
1. Added a window displaying actor parameters when executing the equip command.

v1.6.0 - 2018/08/30: Traits Added
1. Added a Traits that eliminates actor selection when executing the equip command when there is only one actor.

v1.5.2 - 2018/03/15: Bug Fixes
1. Fixed an issue where custom command names were not displayed.

v1.5.1 - 2018/02/24: Bug Fixes
1. Fixed an issue where ternary operators were not Reflectioned when entering scripts.

v1.5.0 - 2018/02/22: Traits Added
1. Added the ability to equip from the item screen.

v1.4.1 - December 2, 2017: Bug Fixes
1. Fixed a typo in the default value of the plugin parameter "Disposal SE Name."

v1.4.0 - September 24, 2017: Traits Additions
1. Added the ability to set the common event ID to be executed for each item.
2. Added the ability to automatically adjust the height of the subcommand window based on the number of commands.

v1.3.0 - September 19, 2017: Traits Additions
1. Added the ability to add commands to execute any common event.

v1.2.1 - August 19, 2017: Bug Fixes
1. Fixed a bug that allowed the subcommand window to be displayed even when no items were in possession.

v1.2.0 - July 23, 2017: Traits Additions
1. Added the ability to set whether or not an item can be discarded individually.
2. Added the ability to play a custom sound effect when discarding an item.

v1.1.0 - 2017/06/11: Traits Added
1. Added the ability to adjust the subcommand window size and position.
2. Added the ability to change the maximum number displayed on the numeric input screen.

v1.0.0 - 2017/06/04: First version created

-----------------------------------------------------------------------------

@param --アイテム情報取得--
@text --Get item information--

@param Use Item Id
@desc The ID of the selected item is stored in the specified variable.
@type number

@param --サブコマンド--
@text --Subcommand--

@param Command List
@desc Set the target and order of displaying execution commands.
@default use,discard,cancel

@param Command Position X
@desc Specifies the X coordinate of the top left corner of the command window (default 0) (-1 means right-justified).
@default 0

@param Command Position Y
@desc Specifies the Y coordinate of the top left corner of the command window (default 180) (-1 means bottom-aligned).
@default 180

@param Command Width
@desc Specifies the width of the command window. (Default: 240) (Reference value: Margin = 18) (-1 means to the right edge of the screen)
@default 240

@param Command Height
@desc Specifies the height of the command window. (Reference values: 1 line = 36, margin = 18) (-1: to the bottom of the screen, 0: auto-adjust)
@default -1

@param --アクター選択画面--
@text --Actor selection screen--

@param Disable Select Single Actor
@desc Do not display actor selection screen when there is only one actor.
@default 0
@type select
@option Show
@value 0
@option Do not display
@value 1

@param --使うコマンド--
@text --Command to use--

@param Command Use Format
@desc Set the command name to use for the execution command.
@default 使う

@param --やめるコマンド--
@text --Stop command--

@param Command Cancel Format
@desc Set the command name for the execution command "Stop".
@default やめる

@param discard
@text --Discard command--

@param Command Discard Format
@desc Set the command name for the execution command "Discard".
@default 捨てる
@parent discard

@param --数値入力画面--
@text --Numeric input screen--
@parent discard

@param Max Number Format
@desc Sets the maximum number to be displayed in the numeric entry window. %1 - Number of items on hand
@default /MAX %1
@parent discard

@param Number Position X
@desc Specifies the X coordinate of the top left corner of the numeric input window. (Default: 0) (-1: right-justified)
@default 240
@parent discard

@param Number Position Y
@desc Specifies the Y coordinate of the top left corner of the numeric input window (default 180) (-1 means bottom-justified).
@default 180
@parent discard

@param Number Width
@desc Specifies the width of the numeric input window. (Default: 456) (Reference value: Margin = 18) (-1 means to the right edge of the screen)
@default 456
@parent discard

@param Number Height
@desc Specifies the height of the numeric input window. (Reference values: 1 line = 36, margin = 18) (-1 means to the bottom of the screen)
@default -1
@parent discard

@param --確認画面--
@text --Confirmation screen--
@parent discard

@param Enable Confirmation
@desc Whether to display a confirmation screen when discarding an item. 1 - Display, 0 - Do not display
@default 1
@type select
@parent discard
@option Show
@value 1
@option Do not display
@value 0

@param Conf Title Format
@desc Set the confirmation content when discarding items. %1 - Item name, %2 - Number to discard
@default Discard [%2] [%1] ?
@parent discard

@param Confirmation Ok Format
@desc Set the command name for the confirmation command "Execute".
@default Execute
@parent discard

@param Confirmation Cancel Format
@desc Set the command name for the confirmation command "Do not execute."
@default Do not execute
@parent discard

@param --捨てるサウンド--
@text --Discard sound--
@parent discard

@param Disposal SE Name
@desc Sets the sound effect when dropping an item.
@default Decision1
@type file
@require 1
@dir audio/se
@parent discard

@param Disposal SE Pitch
@desc Sets the pitch of the sound effect when dropping an item.
@default 100
@type number
@min 50
@max 150
@parent discard

@param Disposal SE Volume
@desc Sets the volume of the sound effect when dropping an item.
@default 90
@type number
@min 0
@max 100
@parent discard

@param equip
@text --Equipment Command--

@param Command Equip Format
@desc Set the command name for the "Equip" execution command.
@default Equip
@parent equip

@param display_timing_equipstatus
@text Window display timing
@desc Specifies when the window should be displayed.
@default 1
@type select
@parent equip
@option Do not display (disable display function)
@value 0
@option Displayed when executing the equip command
@value 1
@option Displayed when selecting an equipped item
@value 2

@param Status_Window_Layout
@text Parameter Layout Settings
@desc Set the size and display position of the equipment parameter window.
@default {"posiX":"0","posiY":"180","width":"240","height":"-1"}
@type struct<windowLayout>
@parent equip

@param Select_Default_Param
@text Standard parameter display settings
@desc Set the parameters to be displayed in standard specifications. 0: Max HP, 1: Max MP, 2~7: Attack power~luck, 8: Name. Separate with a comma (,).
@default 8,2,3,4,5,6,7
@parent equip

@param Enabled_Window_Param
@desc Whether to use the window parameter change function. FTKR_CustomSimpleActorStatus is required.
@default false
@type boolean
@parent equip
@on valid
@off invalid

@param Status_Window_Param
@text Window Parameter Settings
@desc Sets the size and display position of the equipment parameter window. Requires FTKR_CustomSimpleActorStatus.
@type struct<windowParam>
@parent equip

@param Enabled_statusList
@desc Whether to use the display content change function. FTKR_CustomSimpleActorStatus is required.
@default false
@type boolean
@parent equip
@on valid
@off invalid

@param statusList
@text Equipment parameter display content
@desc Sets the status to display and its position. Requires FTKR_CustomSimpleActorStatus.
@type struct<status>[]
@parent equip

@param Actor Status Space In Text
@desc Specifies the spacing when displaying multiple items within a text.
@default 5
@parent equip

@param --カスタムコマンド0--
@text --Custom Command 0--

@param Custom0 Format
@desc Set the command name for the execution command "Custom Command 0".

@param Custom0 EventID
@desc Set the ID of the common event to be executed by custom command 0.
@type number

@param Custom0 Show Condition
@desc Set the conditions for displaying Custom Command 0.

@param Custom0 Enabled Condition
@desc Set the conditions for executing custom command 0.

@param --カスタムコマンド1--
@text --Custom Command 1--

@param Custom1 Format
@desc Set the command name for the execution command "Custom Command 1".

@param Custom1 EventID
@desc Set the ID of the common event to be executed by Custom Command 1.
@type number

@param Custom1 Show Condition
@desc Set the conditions for displaying Custom Command 1.

@param Custom1 Enabled Condition
@desc Set the conditions for executing Custom Command 1.

@param --カスタムコマンド2--
@text --Custom Command 2--

@param Custom2 Format
@desc Set the command name for the execution command "Custom Command 2".

@param Custom2 EventID
@desc Set the ID of the common event to be executed by Custom Command 2.
@type number

@param Custom2 Show Condition
@desc Set the conditions for displaying Custom Command 2.

@param Custom2 Enabled Condition
@desc Set the conditions for executing Custom Command 2.

@param --カスタムコマンド3--
@text --Custom Command 3--

@param Custom3 Format
@desc Set the command name for the execution command "Custom Command 3".

@param Custom3 EventID
@desc Set the ID of the common event to be executed by Custom Command 3.
@type number

@param Custom3 Show Condition
@desc Set the conditions for displaying Custom Command 3.

@param Custom3 Enabled Condition
@desc Set the conditions for executing Custom Command 3.

@param --カスタムコマンド4--
@text --Custom Command 4--

@param Custom4 Format
@desc Set the command name for the execution command "Custom Command 4".

@param Custom4 EventID
@desc Set the ID of the common event to be executed by Custom Command 4.
@type number

@param Custom4 Show Condition
@desc Set the conditions for displaying Custom Command 4.

@param Custom4 Enabled Condition
@desc Set the conditions for executing Custom Command 4.
*/


/*~struct~windowLayout:
@param posiX
@desc Specifies the X coordinate of the top left corner of the window (-1 means right-justified).
@default 0
@type number
@min -1

@param posiY
@desc Specifies the Y coordinate of the top left corner of the window (-1 aligns to the bottom of the screen).
@default 180
@type number
@min -1

@param width
@desc Specify the width of the window. (Reference value: Margin = 18) (-1 means to the right edge of the screen)
@default 240
@type number
@min -1

@param height
@desc Specifies the window width. (Reference values: 1 line = 36, margin = 18) (-1: to the bottom of the screen, 0: auto-adjust)
@default -1
@type number
@min -1
*/

/*~struct~windowParam:
@param fontSize
@desc Specify the font size: Default 28
@default 28
@type number

@param padding
@desc Specifies the margins around the window. Default: 18
@default 18
@type number

@param lineHeight
@desc Specifies the height of one line in the window. Default: 36
@default 36
@type number

@param opacity
@desc Specifies the transparency of the background in the window. Default: 192 (0 is transparent, 255 is opaque)
@default 192
@type number
@max 255

@param hideFrame
@desc Specifies whether to hide the window frame.
@default false
@type boolean
@on hidden
@off display

@param windowSkin
@desc Set the window skin image.
@default Window
@type file
@require 1
@dir img/system/
*/

/*~struct~status:
@param text
@desc Select the status to display. If it is not in the list, enter it directly in text.
@type select
@option name
@value name
@option Nickname
@value nickname
@option Occupation
@value class
@option level
@value level
@option HP
@value hp
@option MP
@value mp
@option TP
@value tp
@option Facial image
@value face
@option Face image (size specified)
@value face(%1)
@option Walking character image
@value chara
@option SV battle character image
@value sv
@option State (horizontal)
@value state
@option State (Vertical)
@value state2(%1)
@option profile
@value profile
@option Normal ability scores
@value param(%1)
@option Normal ability score (base)
@value pbase(%1)
@option Normal ability score (increase)
@value pdiff(%1)
@option Additional Stats
@value xparam(%1)
@option Special Param Score
@value sparam(%1)
@option Equipment
@value equip(%1)
@option Equipment Normal Param Values
@value eparam(%1)
@option Equipment additional ability value
@value exparam(%1)
@option Equipment special ability value
@value esparam(%1)
@option Equipment normal ability value difference
@value ediff(%1)
@option Equipment additional ability value difference
@value exdiff(%1)
@option Equipment special ability value difference
@value esdiff(%1)
@option Unequipped display
@value notequip(%1)
@option Custom Parameters
@value custom(%1)
@option Custom Gauge
@value gauge(%1)
@option Actor-specific custom gauge
@value agauge(%1)
@option Class-specific custom gauge
@value cgauge(%1)
@option Custom Images
@value image
@option Custom Image (Registration ID)
@value image(%1)
@option message
@value message
@option text
@value text(%1)
@option JS formula (numerical display)
@value eval(%1)
@option JS calculation formula (character string display)
@value streval(%1)
@option horizontal line
@value line
@option AOP Stats
@value aop(%1)
@option AOP ability score (base)
@value aopbase(%1)
@option AOP ability value (increase)
@value aopdiff(%1)
@option AOP equipment parameters
@value eaop(%1)
@option AOP equipment parameter difference
@value ediffaop(%1)
@option Item Name
@value iname
@option Item Icon
@value iicon
@option Item Description
@value idesc
@option Item Type
@value itype
@option Item equipment type
@value ietype
@option Item Range
@value iscope
@option Item Elements
@value ielement
@option Item setting details
@value iparam(%1)
@option Item custom image
@value iimage(%1)
@option Number of items owned
@value inumber
@option Map Name
@value mapname

@param value
@desc Enter the content of the status %1 to be set in the format code(%1)

@param x
@desc X coordinate to display
@default 0

@param y
@desc Y coordinate to display
@default 0

@param width
@desc Display width
@default 0
*/

/*:ja
@plugindesc v1.7.3 アイテムボックスにサブコマンドを追加する
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、アイテム選択後にサブコマンドを表示して
実行内容を選択できます。

サブコマンドには以下のコマンドがあります。
1. 使う　　 - アイテムを使用します。使用できない場合はグレー表示になります。
2. 捨てる　 - アイテムを捨てます。「大事なもの」は捨てることが出来ません。
3. 装備する - そのアイテムが、武器や防具ならアクターに装備させます。
          アクター選択画面を表示して装備させる対象を選びます。
4. やめる　 - サブコマンドを閉じます。
5. カスタム - プラグインパラメータで設定したコモンイベントを実行します。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。


-----------------------------------------------------------------------------
表示するサブコマンドの設定
-----------------------------------------------------------------------------
プラグインパラメータ<Command List>で、表示するコマンドを設定します。
表示させたいコマンドのコードを、カンマ(,)で区切って入力すると
入力した順番にコマンドを表示します。(すべて小文字)

<コマンド>　<コード>
使う　　　　use
捨てる　　　discard
装備する　　equip
やめる　　　cancel
カスタム　　custom*　　(*は各カスタムコマンド番号)

例)
 use,discard,custom0,cancel


-----------------------------------------------------------------------------
アイテムを捨てる
-----------------------------------------------------------------------------
サブコマンドの「捨てる」を実行すると、捨てるアイテムの数を設定します。
数を決めると確認画面を表示し、その画面で「実行する」を選択することで、
アイテムを捨てることができます。
捨てるときのＳＥはプラグインパラメータで設定できます。

確認画面は、プラグインパラメータ<Enable Confirmation>で非表示設定に
することができます。

以下のタグをアイテムのメモ欄に記載すると、そのアイテムは捨てることが
できません。

<捨てられない>
<NOT_DISCARDABLE>

また、タグの後ろに数字をつけると、そのＩＤのスイッチがＯＮの間は
捨てることが出来なくなります。

<捨てられない: x>
<NOT_DISCARDABLE: x>
   x : スイッチＩＤ


-----------------------------------------------------------------------------
アイテムを装備する
-----------------------------------------------------------------------------
サブコマンドの「装備する」を実行すると、選択したアイテムが武器や防具なら
アクターを選択して装備を変更することができます。

このサブコマンドは、武器、防具以外のアイテムのを選択した場合は
サブコマンドウィンドウ上に表示しません。

！注意！
装備先のスロットは、そのアイテムの装備タイプによって自動的に設定されます。
他のプラグインにより、同じ装備タイプを複数装備できるようにしていた場合に
正しく動作しない可能性があります。


-----------------------------------------------------------------------------
カスタムコマンド
-----------------------------------------------------------------------------
任意のコモンイベントを実行するカスタムコマンドを設定することができます。
設定したコマンドは、プラグインパラメータ<Command List>に追加してください。

コマンド名
   プラグインパラメータ<Custom* Format>で設定します。

実行するコモンイベントＩＤ
   プラグインパラメータ<Custom* EventID>で設定します。
   アイテム毎に実行するコモンイベントＩＤを設定することもできます。(*1)
   プラグインパラメータとアイテムの個別設定が両方ある場合は
   アイテムの設定を優先します。

表示条件：サブコマンドウィンドウに表示するための条件
   プラグインパラメータ<Custom* Show Condition>と
   アイテム毎の個別条件(*1)を設定できます。
   スクリプト形式の条件式を入力します(*2)。
   設定しない場合は、表示しません。
   プラグインパラメータとアイテムの個別設定が両方ある場合は
   両方の条件を満たした場合にのみ表示します。

有効条件：サブコマンドウィンドウを実行するための条件
   プラグインパラメータ<Custom* Enabled Condition>と
   アイテム毎の個別条件(*1)を設定できます。
   スクリプト形式の条件式を入力します(*2)。
   設定しない場合は、実行できません。
   プラグインパラメータとアイテムの個別設定が両方ある場合は
   両方の条件を満たした場合にのみ実行できます。

(*1)アイテム毎の個別条件の設定方法
   以下のタグをメモ欄に記入することで、アイテム別にs設定できます。
   <カスタムコマンド:x>
   表示条件: 条件式
   有効条件: 条件式
   コモンイベントID: y
   </カスタムコマンド>
       x : カスタムコマンドの番号
       y : 実行するコモンイベントID

(*2)条件式の入力方法
   ダメージ計算式のように、スクリプト形式の計算式を入力することで、
   固定値以外の値を使用することができます。以下のコードを使用できます。
     item   - 使用するアイテムのデータを参照します。(item.id でアイテムＩＤ)
     number - 使用するアイテムの所持数を参照します。
     v[x]   - 変数ID x の値を参照します。
     s[x]   - スイッチID x の値を参照します。
     true   - 常に有効になります。


-----------------------------------------------------------------------------
条件式に使用可能なスクリプト例
-----------------------------------------------------------------------------
１．アイテムの種別（アイテム、武器、防具）を判別する

 DataManager.isWeapon(item)  :選択したアイテムが、種別「武器」
 DataManager.isArmor(item)   :選択したアイテムが、種別「防具」
 DataManager.isItem(item)    :選択したアイテムが、種別「アイテム」


２．選択したアイテムの所持数を取得

 $gameParty.numItems(item)


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2019 Futokoro
http://opensource.org/licenses/mit-license.php


プラグイン公開元
https://github.com/futokoro/RPGMaker/blob/master/README.md


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.7.3 - 2020/01/05 : 不具合修正
   1. プラグインパラメータ「捨てるサウンド」の入力値を正しく読み取れず
      アイテムを捨てる時にエラーになる不具合を修正。

v1.7.2 - 2019/12/25 : 標準パラメータ表示設定の仕様修正
v1.7.1 - 2019/12/25 : 機能追加
   1. 装備変更用に表示するパラメータの対象や順番を変更する機能を追加。

v1.7.0 - 2019/12/22 : 機能追加
   1. 装備コマンド実行時に、アクターのパラメータを表示するウィンドウを追加。

v1.6.0 - 2018/08/30 : 機能追加
   1. アクターが１人の場合に、装備コマンドでアクター選択を不要にする機能を追加。

v1.5.2 - 2018/03/15 : 不具合修正
   1. カスタムコマンド名が表示されない不具合を修正。

v1.5.1 - 2018/02/24 : 不具合修正
   1. スクリプト入力時に三項演算子を使うと反映されない不具合を修正。

v1.5.0 - 2018/02/22 : 機能追加
   1. アイテム画面から装備する機能を追加。

v1.4.1 - 2017/12/02 : 不具合修正
   1. プラグインパラメータ「Disposal SE Name」の初期値の誤字を修正。

v1.4.0 - 2017/09/24 : 機能追加
   1. アイテム別に実行するコモンイベントIDを設定する機能を追加。
   2. サブコマンドウィンドウの高さをコマンドの数で自動調整する機能を追加。

v1.3.0 - 2017/09/19 : 機能追加
   1. 任意のコモンイベントを実行するコマンドの追加機能を追加。

v1.2.1 - 2017/08/19 : 不具合修正
   1. アイテム無所持でもサブコマンドウィンドウを表示できてしまう不具合修正

v1.2.0 - 2017/07/23 : 機能追加
   1. アイテムに個別に捨てられるかどうか設定する機能を追加。
   2. アイテムを捨てる時に任意のＳＥを鳴らす機能を追加。

v1.1.0 - 2017/06/11 : 機能追加
   1. サブコマンドのウィンドウサイズと位置を調整する機能を追加。
   2. 数値入力画面の最大数の表示内容を変更する機能を追加。

v1.0.0 - 2017/06/04 : 初版作成

-----------------------------------------------------------------------------

@param --アイテム情報取得--
@text --アイテム情報取得--

@param Use Item Id
@desc 選択したアイテムのIDを指定した変数に格納します。
@type number

@param --サブコマンド--
@text --サブコマンド--

@param Command List
@desc 実行コマンドの表示する対象と順番を設定します。
@default use,discard,cancel

@param Command Position X
@desc コマンドウィンドウの左上のX座標を指定します。 (デフォルト 0)(-1 で、画面右寄せ)
@default 0

@param Command Position Y
@desc コマンドウィンドウの左上のY座標を指定します。 (デフォルト 180)(-1 で、画面下寄せ)
@default 180

@param Command Width
@desc コマンドウィンドウの幅を指定します。 (デフォルト 240)(参考値：余白 = 18)(-1 で、画面右端まで)
@default 240

@param Command Height
@desc コマンドウィンドウの高さを指定します。 (参考値：1行 = 36、余白 = 18)(-1 :画面下端まで、0 :自動調整)
@default -1

@param --アクター選択画面--
@text --アクター選択画面--

@param Disable Select Single Actor
@desc アクターが１人の時にアクター選択画面を表示しない。
@default 0
@type select
@option 表示する
@value 0
@option 表示しない
@value 1

@param --使うコマンド--
@text --使うコマンド--

@param Command Use Format
@desc 実行コマンドの「使う」のコマンド名を設定します。
@default 使う

@param --やめるコマンド--
@text --やめるコマンド--

@param Command Cancel Format
@desc 実行コマンドの「やめる」のコマンド名を設定します。
@default やめる

@param discard
@text --捨てるコマンド--

@param Command Discard Format
@desc 実行コマンドの「捨てる」のコマンド名を設定します。
@default 捨てる
@parent discard

@param --数値入力画面--
@text --数値入力画面--
@parent discard

@param Max Number Format
@desc 数値入力ウィンドウで最大数を示す表示内容を設定します。 %1 - 手持ちのアイテム数
@default /MAX %1
@parent discard

@param Number Position X
@desc 数値入力ウィンドウの左上のX座標を指定します。 (デフォルト 0)(-1 で、画面右寄せ)
@default 240
@parent discard

@param Number Position Y
@desc 数値入力ウィンドウの左上のY座標を指定します。 (デフォルト 180)(-1 で、画面下寄せ)
@default 180
@parent discard

@param Number Width
@desc 数値入力ウィンドウの幅を指定します。 (デフォルト 456)(参考値：余白 = 18)(-1 で、画面右端まで)
@default 456
@parent discard

@param Number Height
@desc 数値入力ウィンドウの高さを指定します。 (参考値：1行 = 36、余白 = 18)(-1 で、画面下端まで)
@default -1
@parent discard

@param --確認画面--
@text --確認画面--
@parent discard

@param Enable Confirmation
@desc アイテム廃棄実行時に確認画面を表示するか。 1 - 表示する, 0 - 表示しない
@default 1
@type select
@parent discard
@option 表示する
@value 1
@option 表示しない
@value 0

@param Conf Title Format
@desc アイテム廃棄実行時の確認内容を設定します。 %1 - アイテム名, %2 - 捨てる数
@default [%1]を[%2]個 捨てますか？
@parent discard

@param Confirmation Ok Format
@desc 確認コマンドの「実行する」のコマンド名を設定します。
@default 実行する
@parent discard

@param Confirmation Cancel Format
@desc 確認コマンドの「実行しない」のコマンド名を設定します。
@default 実行しない
@parent discard

@param --捨てるサウンド--
@text --捨てるサウンド--
@parent discard

@param Disposal SE Name
@desc アイテムを捨てる時のSEを設定します。
@default Decision1
@type file
@require 1
@dir audio/se
@parent discard

@param Disposal SE Pitch
@desc アイテムを捨てる時のSEのピッチを設定します。
@default 100
@type number
@min 50
@max 150
@parent discard

@param Disposal SE Volume
@desc アイテムを捨てる時のSEの音量を設定します。
@default 90
@type number
@min 0
@max 100
@parent discard

@param equip
@text --装備コマンド--

@param Command Equip Format
@desc 実行コマンドの「装備する」のコマンド名を設定します。
@default 装備する
@parent equip

@param display_timing_equipstatus
@text ウィンドウ表示タイミング
@desc ウィンドウを表示するタイミングを指定します。
@default 1
@type select
@parent equip
@option 表示しない(表示機能を無効にする)
@value 0
@option 装備コマンド実行時に表示
@value 1
@option 装備アイテム選択時に表示
@value 2

@param Status_Window_Layout
@text パラメータレイアウト設定
@desc 装備パラメータウィンドウのサイズや表示位置を設定します。
@default {"posiX":"0","posiY":"180","width":"240","height":"-1"}
@type struct<windowLayout>
@parent equip

@param Select_Default_Param
@text 標準パラメータ表示設定
@desc 標準仕様で表示させるパラメータを設定します。0:最大HP,1:最大MP,2~7:攻撃力~運,8:名前。カンマ(,)で区切ること。
@default 8,2,3,4,5,6,7
@parent equip

@param Enabled_Window_Param
@desc ウィンドウパラメータ変更機能を使うか。FTKR_CustomSimpleActorStatusが必要。
@default false
@type boolean
@parent equip
@on 有効
@off 無効

@param Status_Window_Param
@text ウィンドウパラメータ設定
@desc 装備パラメータウィンドウのサイズや表示位置を設定します。FTKR_CustomSimpleActorStatusが必要。
@type struct<windowParam>
@parent equip

@param Enabled_statusList
@desc 表示内容変更機能を使うか。FTKR_CustomSimpleActorStatusが必要。
@default false
@type boolean
@parent equip
@on 有効
@off 無効

@param statusList
@text 装備パラメータ表示内容
@desc 表示するステータスとその位置を設定します。FTKR_CustomSimpleActorStatusが必要。
@type struct<status>[]
@parent equip

@param Actor Status Space In Text
@desc Text内で複数表示する場合の間隔を指定します。
@default 5
@parent equip

@param --カスタムコマンド0--
@text --カスタムコマンド0--

@param Custom0 Format
@desc 実行コマンドの「カスタムコマンド0」のコマンド名を設定します。

@param Custom0 EventID
@desc カスタムコマンド0で実行するコモンイベントのIDを設定します。
@type number

@param Custom0 Show Condition
@desc カスタムコマンド0を表示する条件を設定します。

@param Custom0 Enabled Condition
@desc カスタムコマンド0を実行する条件を設定します。

@param --カスタムコマンド1--
@text --カスタムコマンド1--

@param Custom1 Format
@desc 実行コマンドの「カスタムコマンド1」のコマンド名を設定します。

@param Custom1 EventID
@desc カスタムコマンド1で実行するコモンイベントのIDを設定します。
@type number

@param Custom1 Show Condition
@desc カスタムコマンド1を表示する条件を設定します。

@param Custom1 Enabled Condition
@desc カスタムコマンド1を実行する条件を設定します。

@param --カスタムコマンド2--
@text --カスタムコマンド2--

@param Custom2 Format
@desc 実行コマンドの「カスタムコマンド2」のコマンド名を設定します。

@param Custom2 EventID
@desc カスタムコマンド2で実行するコモンイベントのIDを設定します。
@type number

@param Custom2 Show Condition
@desc カスタムコマンド2を表示する条件を設定します。

@param Custom2 Enabled Condition
@desc カスタムコマンド2を実行する条件を設定します。

@param --カスタムコマンド3--
@text --カスタムコマンド3--

@param Custom3 Format
@desc 実行コマンドの「カスタムコマンド3」のコマンド名を設定します。

@param Custom3 EventID
@desc カスタムコマンド3で実行するコモンイベントのIDを設定します。
@type number

@param Custom3 Show Condition
@desc カスタムコマンド3を表示する条件を設定します。

@param Custom3 Enabled Condition
@desc カスタムコマンド3を実行する条件を設定します。

@param --カスタムコマンド4--
@text --カスタムコマンド4--

@param Custom4 Format
@desc 実行コマンドの「カスタムコマンド4」のコマンド名を設定します。

@param Custom4 EventID
@desc カスタムコマンド4で実行するコモンイベントのIDを設定します。
@type number

@param Custom4 Show Condition
@desc カスタムコマンド4を表示する条件を設定します。

@param Custom4 Enabled Condition
@desc カスタムコマンド4を実行する条件を設定します。
*/


/*~struct~windowLayout:ja
@param posiX
@desc ウィンドウの左上のX座標を指定します。 (-1 で、画面右寄せ)
@default 0
@type number
@min -1

@param posiY
@desc ウィンドウの左上のY座標を指定します。 (-1 で、画面下寄せ)
@default 180
@type number
@min -1

@param width
@desc ウィンドウの横幅を指定します。 (参考値：余白 = 18)(-1 で、画面右端まで)
@default 240
@type number
@min -1

@param height
@desc ウィンドウの立幅を指定します。 (参考値：1行 = 36、余白 = 18)(-1 :画面下端まで、0 :自動調整)
@default -1
@type number
@min -1
*/

/*~struct~windowParam:ja
@param fontSize
@desc フォントサイズを指定します。：デフォルト 28
@default 28
@type number

@param padding
@desc ウィンドウの周囲の余白を指定します。：デフォルト 18
@default 18
@type number

@param lineHeight
@desc ウィンドウ内の1行の高さを指定します。：デフォルト 36
@default 36
@type number

@param opacity
@desc ウィンドウ内の背景の透明度を指定します。：デフォルト 192(0で透明, 255で不透明)
@default 192
@type number
@max 255

@param hideFrame
@desc ウィンドウ枠を非表示にするかを指定します。
@default false
@type boolean
@on 非表示
@off 表示

@param windowSkin
@desc ウィンドウスキン画像を設定してください。
@default Window
@type file
@require 1
@dir img/system/
*/

/*~struct~status:ja
@param text
@desc 表示するステータスを選択 リストにない場合は、直接テキストで記述
@type select
@option 名前
@value name
@option 二つ名
@value nickname
@option 職業
@value class
@option レベル
@value level
@option HP
@value hp
@option MP
@value mp
@option TP
@value tp
@option 顔画像
@value face
@option 顔画像(サイズ指定)
@value face(%1)
@option 歩行キャラ画像
@value chara
@option SV戦闘キャラ画像
@value sv
@option ステート(横)
@value state
@option ステート(縦)
@value state2(%1)
@option プロフィール
@value profile
@option 通常能力値
@value param(%1)
@option 通常能力値(素)
@value pbase(%1)
@option 通常能力値(増加分)
@value pdiff(%1)
@option 追加能力値
@value xparam(%1)
@option 特殊能力値
@value sparam(%1)
@option 装備
@value equip(%1)
@option 装備通常能力値
@value eparam(%1)
@option 装備追加能力値
@value exparam(%1)
@option 装備特殊能力値
@value esparam(%1)
@option 装備通常能力値差分
@value ediff(%1)
@option 装備追加能力値差分
@value exdiff(%1)
@option 装備特殊能力値差分
@value esdiff(%1)
@option 装備不可表示
@value notequip(%1)
@option カスタムパラメータ
@value custom(%1)
@option カスタムゲージ
@value gauge(%1)
@option アクター別カスタムゲージ
@value agauge(%1)
@option クラス別カスタムゲージ
@value cgauge(%1)
@option カスタム画像
@value image
@option カスタム画像(登録ID)
@value image(%1)
@option メッセージ
@value message
@option テキスト
@value text(%1)
@option JS計算式(数値表示)
@value eval(%1)
@option JS計算式(文字列表示)
@value streval(%1)
@option 横線
@value line
@option AOP能力値
@value aop(%1)
@option AOP能力値(素)
@value aopbase(%1)
@option AOP能力値(増加分)
@value aopdiff(%1)
@option AOP装備パラメータ
@value eaop(%1)
@option AOP装備パラメータ差分
@value ediffaop(%1)
@option アイテム名
@value iname
@option アイテムアイコン
@value iicon
@option アイテム説明
@value idesc
@option アイテムタイプ
@value itype
@option アイテム装備タイプ
@value ietype
@option アイテム範囲
@value iscope
@option アイテム属性
@value ielement
@option アイテム設定詳細
@value iparam(%1)
@option アイテムカスタム画像
@value iimage(%1)
@option アイテム所持数
@value inumber
@option マップ名
@value mapname

@param value
@desc code(%1)の形式で設定するステータスの%1の内容を入力

@param x
@desc 表示するX座標
@default 0

@param y
@desc 表示するY座標
@default 0

@param width
@desc 表示する横幅
@default 0
*/

function Window_ItemSubCommand() {
    this.initialize.apply(this, arguments);
}

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
    var parameters = PluginManager.parameters('FTKR_ItemSubCommand');

    FTKR.ISC = {
        data: {
            itemId: Number(parameters['Use Item Id'] || 0),
        },
        disableSelect: paramParse(parameters['Disable Select Single Actor'] || 0),
        commandList: (parameters['Command List'] || 'use,cancel').split(','),
        subCmdWindow: {
            layout: {
                posiX: Number(parameters['Command Position X'] || 0),
                posiY: Number(parameters['Command Position Y'] || 0),
                width: Number(parameters['Command Width'] || 0),
                height: Number(parameters['Command Height'] || 0),
            },
            name: {
                use: String(parameters['Command Use Format'] || ''),
                discard: String(parameters['Command Discard Format'] || ''),
                equip: String(parameters['Command Equip Format'] || ''),
                cancel: String(parameters['Command Cancel Format'] || ''),
            },
            custom: [
                {//cmd0
                    format: String(parameters['Custom0 Format'] || ''),
                    eventId: Number(parameters['Custom0 EventID'] || 0),
                    show: String(parameters['Custom0 Show Condition'] || ''),
                    enabled: String(parameters['Custom0 Enabled Condition'] || ''),
                },
                {//cmd1
                    format: String(parameters['Custom1 Format'] || ''),
                    eventId: Number(parameters['Custom1 EventID'] || 0),
                    show: String(parameters['Custom1 Show Condition'] || ''),
                    enabled: String(parameters['Custom1 Enabled Condition'] || ''),
                },
                {//cmd2
                    format: String(parameters['Custom2 Format'] || ''),
                    eventId: Number(parameters['Custom2 EventID'] || 0),
                    show: String(parameters['Custom2 Show Condition'] || ''),
                    enabled: String(parameters['Custom2 Enabled Condition'] || ''),
                },
                {//cmd3
                    format: String(parameters['Custom3 Format'] || ''),
                    eventId: Number(parameters['Custom3 EventID'] || 0),
                    show: String(parameters['Custom3 Show Condition'] || ''),
                    enabled: String(parameters['Custom3 Enabled Condition'] || ''),
                },
                {//cmd4
                    format: String(parameters['Custom4 Format'] || ''),
                    eventId: Number(parameters['Custom4 EventID'] || 0),
                    show: String(parameters['Custom4 Show Condition'] || ''),
                    enabled: String(parameters['Custom4 Enabled Condition'] || ''),
                },
            ],
        },
        numberWindow: {
            maxFormat: String(parameters['Max Number Format'] || ''),
            layout: {
                posiX: Number(parameters['Number Position X'] || 0),
                posiY: Number(parameters['Number Position Y'] || 0),
                width: Number(parameters['Number Width'] || 0),
                height: Number(parameters['Number Height'] || 0),
            },
        },
        statusWindow: {
            layout: paramParse(parameters['Status_Window_Layout']),
            timing: paramParse(parameters['display_timing_equipstatus']),
            enabledWp: paramParse(parameters['Enabled_Window_Param']),
            wparam: paramParse(parameters['Status_Window_Param'] || {}),
            dparams: (parameters['Select_Default_Param'] || '').split(','),
            enabledSl: paramParse(parameters['Enabled_statusList']),
            simpleStatus: {
                statusList: paramParse(parameters['statusList']),
                spaceIn: Number(parameters['Actor Status Space In Text'] || 0),
                target: null,
            },
        },
        confWindow: {
            enabled: paramParse(parameters['Enable Confirmation'] || 0),
            title: String(parameters['Conf Title Format'] || ''),
            okFormat: String(parameters['Confirmation Ok Format'] || ''),
            cancelFormat: String(parameters['Confirmation Cancel Format'] || ''),
        },
        sound: {
            discard: {
                name: String(parameters['Disposal SE Name'] || ''),
                pitch: Number(parameters['Disposal SE Pitch'] || 100),
                pan: 0,
                volume: Number(parameters['Disposal SE Volume'] || 90),
            },
        },
    };

    FTKR.ISC.statusWindow.wparam.enabled = FTKR.ISC.statusWindow.enabledWp;

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

    var hasObjectMeta = function (obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function (metacode) {
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        });
    };

    //objのメモ欄から <metacode: x> の値を読み取って返す
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

    var readEntrapmentCodeToTextEx = function (obj, codeTitles) {
        var regs = convertEntrapmentRegArrayEx(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var results = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (matchRegs(line, regs, 'start')) {
                var data = {
                    id: RegExp.$1,
                    text: ''
                };
                setMode = 'read';
            } else if (matchRegs(line, regs, 'end')) {
                setMode = 'none';
                results.push(data);
            } else if (setMode === 'read') {
                data.text += line + ';';
            }
        }
        return results;
    };

    var convertEntrapmentRegArrayEx = function (codeTitles) {
        return codeTitles.map(function (codeTitle) {
            return {
                start: new RegExp('<' + codeTitle + ':[ ]*(.+)>', 'i'),
                end: new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    var matchRegs = function (data, regs, prop) {
        return regs.some(function (reg) {
            return prop ? data.match(reg[prop]) : data.match(reg);
        });
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _ISC_DatabaseLoaded = false;
    var _ISC_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!_ISC_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_ISC_DatabaseLoaded) {
            this.ItemSubCommandNotetags($dataItems);
            this.ItemSubCommandNotetags($dataWeapons);
            this.ItemSubCommandNotetags($dataArmors);
            _ISC_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.ItemSubCommandNotetags = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.isc = [];
            var datas = readEntrapmentCodeToTextEx(obj, ['カスタムコマンド', 'CUSTOM_COMMAND']);
            this.readIscMetaDatas(obj, datas);
        }
    };

    DataManager.setIscBase = function (obj, index) {
        obj.isc[index] = {
            show: true,
            enabled: true,
            eventId: 0,
        };
    };

    DataManager.readIscMetaDatas = function (obj, metaDatas) {
        for (var t = 0; t < metaDatas.length; t++) {
            this.setIscBase(obj, metaDatas[t].id);
            var datas = metaDatas[t].text.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var match = /([^:\s]+)[ ]*:[ ]*(.+)/.exec(data);
                if (!match) continue;
                switch (match[1].toUpperCase()) {
                    case '表示条件':
                    case 'SHOW_CONDITION':
                        obj.isc[t].show = match[2];
                        break;
                    case '有効条件':
                    case 'ENABLED_CONDITION':
                        obj.isc[t].enabled = match[2];
                        break;
                    case 'コモンイベントID':
                    case 'COMMON_EVENT_ID':
                        obj.isc[t].eventId = Number(match[2]);
                        break;
                }
            }
        }
    };

    DataManager.isEquipItem = function (item) {
        return DataManager.isWeapon(item) || DataManager.isArmor(item);
    };

    //=============================================================================
    // アイテム画面の変更
    //=============================================================================

    Window_Selectable.prototype.actSelect = function (index) {
        this.activate();
        this.select(index);
        this.refresh();
    };

    //書き換え
    Window_ItemList.prototype.isEnabled = function (item) {
        return !!item;
    };

    Scene_Item.prototype.convertX = function (layout) {
        return layout.posiX === -1 ? Graphics.boxWidth - layout.width : layout.posiX;
    };

    Scene_Item.prototype.convertY = function (layout) {
        return layout.posiY === -1 ? Graphics.boxHeight - layout.height : layout.posiY;
    };

    Scene_Item.prototype.convertWidth = function (layout) {
        return layout.width === -1 ? Graphics.boxWidth - layout.posiX : layout.width;
    };

    Scene_Item.prototype.convertHeight = function (layout) {
        return layout.height === -1 ? Graphics.boxHeight - layout.posiY : layout.height;
    };

    //------------------------------------------------------------------------
    //サブコマンドの追加
    //------------------------------------------------------------------------
    var _ISC_Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        _ISC_Scene_Item_create.call(this);
        this.createSubCommandWindows();
    };

    Scene_Item.prototype.createSubCommandWindows = function () {
        this.createSubCommandWindow();
    };

    Scene_Item.prototype.createSubCommandWindow = function () {
        var wnd = FTKR.ISC.subCmdWindow.layout;
        var wx = this.convertX(wnd);
        var wy = this.convertY(wnd);
        var ww = this.convertWidth(wnd);
        var wh = this.convertHeight(wnd);
        this._subCommandWindow = new Window_ItemSubCommand(wx, wy, ww, wh);
        var window = this._subCommandWindow;
        window.setHandler('ok', this.onSubComOk.bind(this));
        window.setHandler('cancel', this.onSubComCancel.bind(this));
        window.hide();
        this.addWindow(window);
    };

    Scene_Item.prototype.onSubComOk = function () {
        var symbol = this._subCommandWindow.item().symbol;
        if (FTKR.ISC.data.itemId) {
            $gameVariables.setValue(FTKR.ISC.data.itemId, this.item().id);
        }
        this.subCommandAct(symbol, this.item());
    };

    Scene_Item.prototype.subCommandAct = function (symbol, item) {
        switch (symbol) {
            case 'use':
                return this.subCommandActUseItem();
            case 'discard':
                return this.subCommandActDiscardItem();
            case 'equip':
                return this.subCommandActEquipItem();
            default:
                var match = /custom(\d+)/i.exec(symbol);
                if (match) {
                    var cmdId = Number(match[1]);
                    var eventId = item.isc[cmdId] && item.isc[cmdId].eventId ?
                        item.isc[cmdId].eventId :
                        FTKR.ISC.subCmdWindow.custom[cmdId].eventId;
                    $gameParty.setLastItem(item);
                    $gameTemp.reserveCommonEvent(eventId);
                    this.checkCommonEvent();
                    return;
                } else {
                    return this.onSubComCancel();
                }
        }
    };

    Scene_Item.prototype.onSubComCancel = function () {
        this._subCommandWindow.hide();
        this._subCommandWindow.deselect();
        this._numberWindow.hide();
        this._itemWindow.actSelect(this._itemWindow.index());
    };

    var _ISC_Scene_Item_onItemOk = Scene_Item.prototype.onItemOk;
    Scene_Item.prototype.onItemOk = function () {
        this._subCommandWindow._item = this._itemWindow.item();
        if (!FTKR.ISC.subCmdWindow.layout.height) this._subCommandWindow.refreshHeight();
        this._subCommandWindow.show();
        this._subCommandWindow.actSelect(0);
    };

    //------------------------------------------------------------------------
    //アイテムを使う処理の修正
    //------------------------------------------------------------------------
    Scene_Item.prototype.subCommandActUseItem = function () {
        this._subCommandWindow.hide();
        if (FTKR.ISC.disableSelect && $gameParty.members().length == 1) {
            $gameParty.setLastItem(this.item());
            this._actorWindow.selectLast();
            this.onActorOk();
            this.activateItemWindow();
        } else {
            _ISC_Scene_Item_onItemOk.call(this);
        }
    };

    //------------------------------------------------------------------------
    //アイテムを捨てる処理の追加
    //------------------------------------------------------------------------
    var _ISC_Scene_Item_createSubCommandWindows_discard = Scene_Item.prototype.createSubCommandWindows;
    Scene_Item.prototype.createSubCommandWindows = function () {
        _ISC_Scene_Item_createSubCommandWindows_discard.call(this);
        this.createNumberWindow();
        if (FTKR.ISC.confWindow.enabled) {
            this.createConfTitleWindow();
            this.createConfWindow();
        }
    };

    Scene_Item.prototype.subCommandActDiscardItem = function () {
        this._numberWindow.setup(this.item(), $gameParty.numItems(this.item()));
        this._numberWindow.show();
        this._numberWindow.activate();
    };

    //捨てる数を指定する画面の追加
    Scene_Item.prototype.createNumberWindow = function () {
        var wnd = FTKR.ISC.numberWindow.layout;
        var wx = this.convertX(wnd);
        var wy = this.convertY(wnd);
        var wh = this.convertHeight(wnd);
        this._numberWindow = new Window_ItemNumber(wx, wy, wh);
        this._numberWindow.hide();
        this._numberWindow.setHandler('ok', this.onNumberOk.bind(this));
        this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };

    Scene_Item.prototype.onNumberOk = function () {
        if (FTKR.ISC.confWindow.enabled) {
            SoundManager.playOk();
            this._confTitleWindow.setItem(this._subCommandWindow._item, this._numberWindow.number());
            this._confTitleWindow.show();
            this._confWindow.show();
            this._confWindow.actSelect(0);
        } else {
            this.itemDiscard();
        }
    };

    Scene_Item.prototype.onNumberCancel = function () {
        this._numberWindow.hide();
        this._subCommandWindow.actSelect(this._subCommandWindow.index());
    };

    //捨てる処理
    Scene_Item.prototype.itemDiscard = function () {
        AudioManager.playSe(FTKR.ISC.sound.discard);
        $gameParty.gainItem(this._subCommandWindow._item, -this._numberWindow.number());
        this.onSubComCancel();
    };

    //確認画面の追加
    Scene_Item.prototype.createConfTitleWindow = function () {
        var wx = Graphics.boxWidth / 4;
        var wh = this._helpWindow.fittingHeight(1);
        var ww = Graphics.boxWidth / 2;
        var wy = Graphics.boxHeight / 2 - wh;
        this._confTitleWindow = new Window_ItemConfTitle(wx, wy, ww, wh);
        this._confTitleWindow.hide();
        this.addWindow(this._confTitleWindow);
    };

    Scene_Item.prototype.createConfWindow = function () {
        var ctw = this._confTitleWindow;
        var wx = ctw.x;
        var wy = ctw.y + ctw.height;
        var ww = ctw.width;
        var wh = this._helpWindow.fittingHeight(1);
        this._confWindow = new Window_ItemConf(wx, wy, ww, wh);
        this._confWindow.setHandler('ok', this.onConfirmationOk.bind(this));
        this._confWindow.setHandler('cancel', this.onConfirmationCancel.bind(this));
        this._confWindow.hide();
        this._confTitleWindow.setWindow(this._confWindow);
        this.addWindow(this._confWindow);
    };

    Scene_Item.prototype.onConfirmationOk = function () {
        if (this._confWindow.item().dicision) {
            this._confTitleWindow.hide();
            this._confWindow.hide();
            this._confWindow.deselect();
            this.itemDiscard();
        } else {
            SoundManager.playCancel();
            this.onConfirmationCancel();
        }
    };

    Scene_Item.prototype.onConfirmationCancel = function () {
        this._confTitleWindow.hide();
        this._confWindow.hide();
        this._confWindow.deselect();
        this.onSubComCancel();
    };

    //------------------------------------------------------------------------
    //アイテムを装備する処理の追加
    //------------------------------------------------------------------------
    var _ISC_Scene_Item_createSubCommandWindows_Equip = Scene_Item.prototype.createSubCommandWindows;
    Scene_Item.prototype.createSubCommandWindows = function () {
        _ISC_Scene_Item_createSubCommandWindows_Equip.call(this);
        if (FTKR.ISC.statusWindow.timing) {
            this.createEquipStatusWindow();
        }
    };

    var _ISC_Scene_Item_onItemOk_Equip = Scene_Item.prototype.onItemOk;
    Scene_Item.prototype.onItemOk = function () {
        _ISC_Scene_Item_onItemOk_Equip.call(this);
        if (FTKR.ISC.statusWindow.timing == 2 && DataManager.isEquipItem(this.item())) {
            var actor = $gameParty.members()[0];
            this._subEquipStatusWindow.setActorEquipStatus(actor, this.item());
            this._subEquipStatusWindow.setActor(actor);
            this._subEquipStatusWindow.show();
        }
    };

    Scene_Item.prototype.subCommandActEquipItem = function () {
        if (FTKR.ISC.disableSelect && $gameParty.members().length == 1) {
            this.equipTargetActor($gameParty.members()[0], this.item())
            if (FTKR.ISC.statusWindow.timing) this._subEquipStatusWindow.hide();
        } else {
            this._isSubComEquip = true;
            this._actorWindow.x = Graphics.boxWidth - this._actorWindow.width;
            this._actorWindow.actSelect(0);
            this._actorWindow.show();
            if (FTKR.ISC.statusWindow.timing == 1) {
                var actor = $gameParty.targetActor();
                this._subEquipStatusWindow.setActorEquipStatus(actor, this.item());
                this._subEquipStatusWindow.setActor(actor);
                this._subEquipStatusWindow.show();
            }
        }
    };

    Scene_Item.prototype.createEquipStatusWindow = function () {
        var wnd = FTKR.ISC.statusWindow.layout;
        var wx = this.convertX(wnd);
        var wy = this.convertY(wnd);
        this._subEquipStatusWindow = new Window_ICS_EquipStatus(wx, wy);
        var window = this._subEquipStatusWindow;
        window.hide();
        this.addWindow(window);
        this._actorWindow.setWindow(window);
    };

    var _ISC_Scene_Item_onSubComCancel = Scene_Item.prototype.onSubComCancel;
    Scene_Item.prototype.onSubComCancel = function () {
        _ISC_Scene_Item_onSubComCancel.call(this);
        if (FTKR.ISC.statusWindow.timing == 2) this._subEquipStatusWindow.hide();
    };

    var _ISC_Scene_Item_onActorOk = Scene_Item.prototype.onActorOk;
    Scene_Item.prototype.onActorOk = function () {
        if (this._isSubComEquip) {
            this._isSubComEquip = false;
            this.equipTargetActor($gameParty.targetActor(), this.item());
            this.hideActorWindows();
        } else {
            _ISC_Scene_Item_onActorOk.call(this);
        }
    };

    var _ISC_Scene_Item_onActorCancel = Scene_Item.prototype.onActorCancel;
    Scene_Item.prototype.onActorCancel = function () {
        if (this._isSubComEquip) {
            this._isSubComEquip = false;
            this.hideActorWindows();
            this._subCommandWindow.activate();
        } else {
            _ISC_Scene_Item_onActorCancel.call(this);
        }
    };

    Scene_Item.prototype.equipTargetActor = function (actor, item) {
        if (actor && actor.canEquip(item)) {
            SoundManager.playEquip();
            actor.changeEquip(item.etypeId - 1, item);
            this._actorWindow.refresh();
            this._subCommandWindow.hide();
            this._itemWindow.actSelect(0);
        } else {
            SoundManager.playBuzzer();
            this._subCommandWindow.activate();
        }
    };

    Scene_Item.prototype.hideActorWindows = function () {
        this._actorWindow.deactivate();
        this._actorWindow.hide();
        if (FTKR.ISC.statusWindow.timing == 1) this._subEquipStatusWindow.hide();
    };

    // Window_MenuActorの修正
    //  アクター選択ウィンドウでカーソルを動かした時にステータス画面を更新
    Window_MenuActor.prototype.select = function (index) {
        Window_MenuStatus.prototype.select.call(this, index);
        this.updateTempActor(index);
    };

    Window_MenuActor.prototype.setWindow = function (window) {
        this._subEquipStatusWindow = window;
    };

    Window_MenuActor.prototype.updateTempActor = function (index) {
        if (this._subEquipStatusWindow) {
            var actor = $gameParty.members()[index];
            if (actor) {
                var item = SceneManager._scene._subCommandWindow._item;
                this._subEquipStatusWindow.setActorEquipStatus(actor, item);
                this._subEquipStatusWindow.setActor(actor);
            }
        }
    };

    //=============================================================================
    // Window_ItemNumber
    // 数値入力用クラス
    //=============================================================================

    function Window_ItemNumber() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemNumber.prototype = Object.create(Window_ShopNumber.prototype);
    Window_ItemNumber.prototype.constructor = Window_ItemNumber;

    Window_ItemNumber.prototype.convertWidth = function (layout) {
        return layout.width === -1 ? Graphics.boxWidth - layout.posiX : layout.width;
    };

    Window_ItemNumber.prototype.windowWidth = function () {
        return this.convertWidth(FTKR.ISC.numberWindow.layout);
    };

    Window_ItemNumber.prototype.refresh = function () {
        this.contents.clear();
        this.drawItemName(this._item, 0, this.itemY());
        this.drawMultiplicationSign();
        this.drawNumber();
        var width = this.width - this.standardPadding() * 2;
        var text = FTKR.ISC.numberWindow.maxFormat.format(this._max);
        var x = width - this.textWidth(text);
        this.drawTextEx(text, x, this.itemY() + this.lineHeight());
    };

    Window_ItemNumber.prototype.playOkSound = function () {
        //SoundManager.playOk();
    };

    //=============================================================================
    // Window_ItemConfTitle
    // 確認画面用ウィンドウクラス
    //=============================================================================

    function Window_ItemConfTitle() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemConfTitle.prototype = Object.create(Window_Base.prototype);
    Window_ItemConfTitle.prototype.constructor = Window_ItemConfTitle;

    Window_ItemConfTitle.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._item = null;
        this._number = 0;
        this._confWindow = null;
        this.refresh();
    };

    Window_ItemConfTitle.prototype.refresh = function () {
        this.contents.clear();
        this.drawTitle();
    };

    Window_ItemConfTitle.prototype.drawTitle = function () {
        if (this._item) {
            var text = FTKR.ISC.confWindow.title.format(this._item.name, this._number);
            var width = this.textWidth(text);
            this.resizeWindow(width);
            this._confWindow.resizeWindow(width);
            this.drawTextEx(text, 0, 0);
        }
    };

    Window_ItemConfTitle.prototype.resizeWindow = function (width) {
        this.width = width + this.standardPadding() * 2;
        this.contents.resize(width, this.contentsHeight());
        this.x = (Graphics.boxWidth - this.width) / 2
    };

    Window_ItemConfTitle.prototype.setItem = function (item, number) {
        this._item = item;
        this._number = number;
        this.refresh();
    };

    Window_ItemConfTitle.prototype.setWindow = function (window) {
        this._confWindow = window;
    };

    //=============================================================================
    // Window_ItemConf
    // 確認用コマンドを表示・処理するウィンドウ
    //=============================================================================

    function Window_ItemConf() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemConf.prototype = Object.create(Window_Selectable.prototype);
    Window_ItemConf.prototype.constructor = Window_ItemConf;

    Window_ItemConf.prototype.initialize = function (x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._data = [];
        this._enabled = false;
        this._dicision = false;
    };

    Window_ItemConf.prototype.maxCols = function () {
        return 2;
    };

    Window_ItemConf.prototype.maxItems = function () {
        return this._data ? this._data.length : 1;
    };

    Window_ItemConf.prototype.item = function () {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_ItemConf.prototype.makeItemList = function () {
        this._data = [
            { dicision: true, disp: FTKR.ISC.confWindow.okFormat },
            { dicision: false, disp: FTKR.ISC.confWindow.cancelFormat }
        ];
    };

    Window_ItemConf.prototype.isEnabled = function (index) {
        return true;
    };

    Window_ItemConf.prototype.isCurrentItemEnabled = function () {
        return this.isEnabled(this.index());
    };

    Window_ItemConf.prototype.drawItem = function (index) {
        var rect = this.itemRect(index);
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
        this.changePaintOpacity(1);
    };

    Window_ItemConf.prototype.refresh = function () {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_ItemConf.prototype.resizeWindow = function (width) {
        this.width = width + this.standardPadding() * 2;
        this.contents.resize(width, this.contentsHeight());
        this.x = (Graphics.boxWidth - this.width) / 2
        this.refresh();
    };

    Window_ItemConf.prototype.playOkSound = function () {
        //SoundManager.playOk();
    };

    //=============================================================================
    // Window_ItemSubCommand
    // スキル選択後の実行用コマンドを表示・処理するウィンドウ
    //=============================================================================

    Window_ItemSubCommand.prototype = Object.create(Window_Selectable.prototype);
    Window_ItemSubCommand.prototype.constructor = Window_ItemSubCommand;

    Window_ItemSubCommand.prototype.initialize = function (x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._data = [];
        this._enabled = false;
        this._item = null;
        this._symbol = '';
    };

    Window_ItemSubCommand.prototype.maxItems = function () {
        return this._data ? this._data.length : 1;
    };

    Window_ItemSubCommand.prototype.item = function () {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_ItemSubCommand.prototype.refreshHeight = function () {
        this.refresh();
        var height = Math.min(this.fittingHeight(this._data.length), Graphics.boxHeight - this.y);
        this.move(this.x, this.y, this.width, height);
    };

    Window_ItemSubCommand.prototype.addSubCommand = function (symbol, enabled, disp) {
        this._data.push({ symbol: symbol, enabled: enabled, disp: disp });
    };

    Window_ItemSubCommand.prototype.makeItemList = function () {
        this._data = [];
        if (!this._item) return;
        FTKR.ISC.commandList.forEach(function (symbol) {
            this.addSubCommandList(symbol);
        }, this);
    };

    Window_ItemSubCommand.prototype.addSubCommandList = function (symbol) {
        var name = FTKR.ISC.subCmdWindow.name;
        switch (symbol) {
            case 'use':
                return this.addSubCommand(symbol, this.canUse(this._item), name.use);
            case 'discard':
                return this.addSubCommand(symbol, this.canDiscard(), name.discard);
            case 'cancel':
                return this.addSubCommand(symbol, true, name.cancel);
            case 'equip':
                if (!this.isEquipItem(this._item)) return;
                return this.addSubCommand(symbol, this.canEquip(this._item), name.equip);
            default:
                var match = /custom(\d+)/i.exec(symbol);
                if (match) {
                    var cmdId = Number(match[1]);
                    var cmd = FTKR.ISC.subCmdWindow.custom[cmdId];
                    if (cmd && this.isCustomShow(this._item, cmdId, cmd)) {
                        this.addSubCommand(symbol, this.isCustomEnabled(this._item, cmdId, cmd), cmd.format);
                    }
                }
                return;
        }
    };

    Window_ItemSubCommand.prototype.canUse = function (item) {
        return $gameParty.canUse(item);
    };

    Window_ItemSubCommand.prototype.canDiscard = function () {
        return this._item.itypeId !== 2 &&
            !hasObjectMeta(this._item, ['捨てられない', 'Not_discardable']) &&
            !this.checkSw();
    };

    Window_ItemSubCommand.prototype.isEquipItem = function (item) {
        return DataManager.isWeapon(item) || DataManager.isArmor(item);
    };

    Window_ItemSubCommand.prototype.canEquip = function (item) {
        return DataManager.isWeapon(item) || DataManager.isArmor(item);
    };

    Window_ItemSubCommand.prototype.isCustomShow = function (item, cmdId, cmd) {
        FTKR.setGameData(null, null, item, $gameParty.numItems(item));
        return !(!cmd.show && !item.isc[cmdId] ||
            cmd.show && !FTKR.evalFormula(cmd.show) ||
            item.isc[cmdId] && !FTKR.evalFormula(item.isc[cmdId].show));
    };

    Window_ItemSubCommand.prototype.isCustomEnabled = function (item, cmdId, cmd) {
        FTKR.setGameData(null, null, item, $gameParty.numItems(item));
        return !(!cmd.enabled && !item.isc[cmdId] ||
            cmd.enabled && !FTKR.evalFormula(cmd.enabled) ||
            item.isc[cmdId] && !FTKR.evalFormula(item.isc[cmdId].enabled));
    };

    Window_ItemSubCommand.prototype.checkSw = function () {
        var id = Number(readObjectMeta(this._item, ['捨てられない', 'Not_discardable']));
        if (id > 0) {
            return $gameSwitches.value(id);
        } else {
            return false;
        }
    };

    Window_ItemSubCommand.prototype.isCurrentItemEnabled = function () {
        return this.isEnabled(this.index());
    };

    Window_ItemSubCommand.prototype.isEnabled = function (index) {
        return this._data[index].enabled;
    };

    Window_ItemSubCommand.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this._data[index].disp, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    };

    Window_ItemSubCommand.prototype.refresh = function () {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_ItemSubCommand.prototype.setItem = function (item) {
        if (this._item === item) return;
        this._item = item;
        this.refresh();
    };

    //=============================================================================
    // Window_ICS_EquipStatus
    // ステータス画面
    //=============================================================================

    function Window_ICS_EquipStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_ICS_EquipStatus.prototype = Object.create(Window_EquipStatus.prototype);
    Window_ICS_EquipStatus.prototype.constructor = Window_ICS_EquipStatus;

    Window_ICS_EquipStatus.prototype.convertWidth = function (layout) {
        return layout.width === -1 ? Graphics.boxWidth - layout.posiX : layout.width;
    };

    Window_ICS_EquipStatus.prototype.convertHeight = function (layout) {
        return layout.height === -1 ? Graphics.boxHeight - layout.posiY : layout.height;
    };

    Window_ICS_EquipStatus.prototype.windowWidth = function () {
        return this.convertWidth(FTKR.ISC.statusWindow.layout);
    };

    Window_ICS_EquipStatus.prototype.windowHeight = function () {
        return this.convertHeight(FTKR.ISC.statusWindow.layout);
    };

    Window_ICS_EquipStatus.prototype.setActorEquipStatus = function (actor, item) {
        if (actor.canEquip(item)) {
            var tempActor = JsonEx.makeDeepCopy(actor);
            tempActor.forceChangeEquip(item.etypeId - 1, item);
        } else {
            var tempActor = null;
        }
        this.setTempActor(tempActor);
    };

    Window_ICS_EquipStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._actor) {
            FTKR.ISC.statusWindow.dparams.forEach(function (paramId, i) {
                this.drawDefaultParams(i, Number(paramId))
            }, this);
        }
    };

    Window_ICS_EquipStatus.prototype.drawDefaultParams = function (index, paramId) {
        if (paramId == 8) {
            return this.drawActorName(this._actor, this.textPadding(), this.lineHeight() * index);
        } else if (paramId >= 0 && paramId < 8) {
            return this.drawItem(0, this.lineHeight() * index, paramId);
        }
    };

    Window_ICS_EquipStatus.prototype.drawItem = function (x, y, paramId) {
        var width = this.width - this.padding * 2;
        var w1 = Math.floor(width * 0.4);
        var w2 = Math.floor(width * 0.1);
        var w3 = (width - w1 - w2 - this.textPadding()) * 0.5;
        this.drawParamName(x + this.textPadding(), y, w1, paramId);
        if (this._actor) {
            this.drawCurrentParam(x + this.textPadding() + w1, y, w3, paramId);
        }
        this.drawRightArrow(x + this.textPadding() + w1 + w3, y, w2);
        if (this._tempActor) {
            this.drawNewParam(x + this.textPadding() + w1 + w2 + w3, y, w3, paramId);
        }
    };

    Window_ICS_EquipStatus.prototype.drawParamName = function (x, y, width, paramId) {
        this.changeTextColor(this.systemColor());
        width = Math.min(120, width);
        this.drawText(TextManager.param(paramId), x, y, width);
    };

    Window_ICS_EquipStatus.prototype.drawCurrentParam = function (x, y, width, paramId) {
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x, y, width, 'right');
    };

    Window_ICS_EquipStatus.prototype.drawRightArrow = function (x, y, width) {
        this.changeTextColor(this.systemColor());
        this.drawText('\u2192', x, y, width, 'center');
    };

    Window_ICS_EquipStatus.prototype.drawNewParam = function (x, y, width, paramId) {
        var newValue = this._tempActor.param(paramId);
        var diffvalue = newValue - this._actor.param(paramId);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(newValue, x, y, width, 'right');
    };


    if (Imported.FTKR_CSS && FTKR.ISC.statusWindow.enabledWp) {

        Window_ICS_EquipStatus.prototype.standardCssLayout = function () {
            return FTKR.ISC.statusWindow.wparam;
        };

    };
    if (Imported.FTKR_CSS && FTKR.ISC.statusWindow.enabledSl) {

        Window_ICS_EquipStatus.prototype.standardCssStatus = function () {
            return FTKR.ISC.statusWindow.simpleStatus;
        };

        Window_ICS_EquipStatus.prototype.evalCssStrFormula = function (actor, formula) {
            if (!formula) return '';
            FTKR.setGameData(actor, this._tempActor, this._item);
            return FTKR.evalStrFormula(formula);
        };

        Window_ICS_EquipStatus.prototype.evalCssCustomFormula = function (actor, formula) {
            if (!formula) return '';
            FTKR.setGameData(actor, this._tempActor, this._item);
            return FTKR.evalFormula(formula);
        };

        Window_ICS_EquipStatus.prototype.refresh = function () {
            this.contents.clear();
            if (this._actor) {
                var lss = this._lssStatus;
                var w = this.width - this.padding * 2;
                var h = this.height - this.padding * 2;
                lss.target = this._tempActor;
                this.drawCssActorStatus(0, this._actor, 0, 0, w, h, lss);
            }
        };

    };
}());//FTKR_ItemSubCommand.js END

//EOF