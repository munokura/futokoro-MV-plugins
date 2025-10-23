//=============================================================================
// メニュー画面上でコモンイベントを実行できるようにするプラグイン
// FTKR_MenuEvent.js
// 作成者     : フトコロ
// プラグインNo : 59
// 作成日     : 2017/11/27
// 最終更新日 : 2018/10/05
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ME = true;

var FTKR = FTKR || {};
FTKR.ME = FTKR.ME || {};

//=============================================================================
/*:
@plugindesc v1.1.0 Allow common events to be performed on the menu screen
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
This plugin allows you to execute common events set by item or skill Traits on the menu screen.

However, not all Event's Contents can be executed.

-----------------------------------------------------------------------------
Setup Method
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. When using this plugin in conjunction with FTKR_ItemSubCommand.js, place this plugin at the bottom.

3. When using this plugin in conjunction with a message window-related plugin, disable the plugin parameter "Enabled Message Window Setting."

-----------------------------------------------------------------------------
How to Set Up Common Events
-----------------------------------------------------------------------------
To execute common events on the menu, be sure to add the following plugin command to the end of the common event.

1. For items and skills that require actor selection
ME_ACTIVATE_ACTOR_WINDOW

Note that if the number of items held during a common event reaches zero,
you will automatically return to the item selection screen instead of the actor selection screen.

2. For items and skills that do not require actor selection
ME_ACTIVATE_ITEM_WINDOW

or

ME_ACTIVATE_SKILL_WINDOW

Also, if you increase or decrease the number of items held during a common event,
you must refresh the item window.
If you do not refresh, the number on the screen will not be updated.

You can set automatic refresh settings uniformly using plugin parameters, but you can also refresh using the following plugin commands.

ME_REFRESH_ITEM_WINDOW

-----------------------------------------------------------------------------
When using with the Subcommand Plugin (FTKR_ItemSubCommand.js)
-----------------------------------------------------------------------------
When using with the Subcommand Plugin, common events executed by subcommands can also be executed from the menu screen.

For subcommand events, add the following plugin command to the end of the event.

ME_ACTIVATE_SUB_WINDOW

However, if the number of items held for the selected item reaches 0 during a subcommand event,
you will automatically return to the item selection screen instead of the subcommand selection screen.

You can also use the following plugin command instead of the above.

ME_ACTIVATE_ITEM_WINDOW

In this case, the subcommand will close after the event ends and you will return to the item selection screen.

-----------------------------------------------------------------------------
Reference Information 1: Event's Contents that have been confirmed to work
-----------------------------------------------------------------------------
- Variable manipulation
- Wait
- Message display (text, choice options, numerical input, item selection, scrolling)
- Displaying/hiding pictures

-----------------------------------------------------------------------------
Reference Information 2: Message Window and Picture Display Priority
-----------------------------------------------------------------------------
The display priorities for message windows and pictures that can be displayed using Event's Contents are as follows. (Default settings)

Low priority------------------------------High priority
Menu screen < Message window < Picture

The higher priority window will be displayed in the foreground when overlapping.

You can change the display priority of message windows and pictures using the plugin parameter "Display priority."

----------------------------------------------------------------------------
Reference Information 3: Event's Contents that cannot be executed
-----------------------------------------------------------------------------
- Timer manipulation
- Animation display
- Movement and display operations targeting events and players

-----------------------------------------------------------------------------
!! ! Precautions when displaying message windows in the foreground!!
-----------------------------------------------------------------------------
Depending on the message window's transparency, the menu screen behind it may be visible through it.

(Normally, when windows overlap, the menu screen behind it is hidden.)

To prevent this, hide the menu screen by displaying a picture behind the window.

In this setting, you can change the following window settings using the "Menu Message Window" plugin parameter.
*Individual settings cannot be made for each window.

<Target windows>
Message window
Selection window
Numerical input window
Item selection window
Scroll window (only font size and line height are valid)

If there is a conflict with other message-related plugins, set the "Menu Message Window" parameter to "Text" and leave it blank.

-----------------------------------------------------------------------------
About this plugin's license (License)
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin Publisher
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.1.0 - 2018/10/05: Added Traits
1. Added the ability to disable message window settings.

v1.0.3 - 2018/02/20: Fixed Bugs
1. Fixed an issue where common events for items with a range of "none" would not execute correctly when the message window was displayed.

v1.0.2 - December 2, 2017: Specification changes, Traits additions
1. Fixed a bug that caused the game to return to the item selection screen if the currently selected item count reached zero during a common event.
2. Added a process to update the item list screen when returning to the selection screen.
3. Changed the ability to execute menu events to be set separately for when using an item and when executing a custom subcommand.
4. Added an automatic item window update function and plugin commands.
5. Removed the timer function while the menu is displayed.

v1.0.1 - November 28, 2017: Bug fixes, Traits additions.
1. Fixed a bug in plugin commands.
2. Fixed a bug that caused the Menu Message Window to be disabled when the field is left blank.

v1.0.0 - November 27, 2017: Initial version created

-----------------------------------------------------------------------------

@param Enable Item Event
@desc Sets the behavior of item events when the menu is displayed.
@default false
@type boolean
@on Run from the menu
@off Run in Maps

@param Enable Item SubCom Event
@desc Sets the behavior of common events executed by item subcommands while the menu is displayed.
@default false
@type boolean
@on Run from the menu
@off Run in Maps

@param Enable Skill Event
@desc Sets the behavior when the skill event menu is displayed.
@default false
@type boolean
@on Run from the menu
@off Run in Maps

@param Display Priority
@desc Sets whether the message window or the picture is displayed in front.
@default false
@type boolean
@on Message window
@off Picture

@param Auto Refresh Item Window
@desc Set whether to automatically refresh the item window when a common event is executed.
@default false
@type boolean
@on Automatic update ON
@off Automatic update OFF

@param Enabled Message Window Setting
@desc Enables the setting for the message window to be displayed on the menu screen.
@default false
@type boolean
@on valid
@off invalid

@param Menu Message Window
@desc Set the message window to be displayed on the menu screen. *Only valid when the message window is set to the front
@default {"Window_Skin":"Window","Font_Size":"28","Window_Padding":"18","Window_Line_Height":"36","Window_Opacity":"192","Hide_Window_Frame":"false"}
@type struct<menu>
*/


/*~struct~menu:
@param Window_Skin
@desc Images to use for window skins
@default Window
@type file
@require 1
@dir img/system/

@param Font_Size
@desc Font size
@default 28
@type number

@param Window_Padding
@desc Margins around the window
@default 18
@type number
@min 0

@param Window_Line_Height
@desc The height of one line in the window
@default 36
@type number

@param Window_Opacity
@desc Transparency of the background in the window: 0 - transparent, 255 - opaque
@default 192
@type number
@min 0
@max 255

@param Hide_Window_Frame
@desc Do you want to hide the window frame?
@default false
@type boolean
@on Hide
@off Show
*/


/*:ja
@plugindesc v1.1.0 メニュー画面上でコモンイベントを実行できるようにする
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
メニュー画面上でアイテムやスキルの特徴で設定したコモンイベントを
実行できるようにします。

ただし、すべてのイベントコマンドが実行できるわけではありません。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. FTKR_ItemSubCommand.jsと組み合わせる場合は、本プラグインが
   下になるように配置してください。

3. メッセージウィンドウに関するプラグインと組み合わせて使用する場合には
   プラグインパラメータ Enabled Message Window Setting を無効にして
   使ってください。


-----------------------------------------------------------------------------
コモンイベントの設定方法
-----------------------------------------------------------------------------
メニュー上でコモンイベントを実行するためには、
必ずコモンイベントの最後に、以下のプラグインコマンドを追加してください。

1. アクターを選択するアイテム・スキルの場合
     ME_アクター選択に戻る
     ME_ACTIVATE_ACTOR_WINDOW

   なお、コモンイベントの中で、選択中のアイテムの所持数が０になった場合は
   アクター選択ではなく、アイテム選択画面に自動的に戻ります。


2. アクターを選択しないアイテム・スキルの場合
     ME_アイテム選択に戻る
     ME_ACTIVATE_ITEM_WINDOW

     または

     ME_スキル選択に戻る
     ME_ACTIVATE_SKILL_WINDOW


また、コモンイベントの中で、アイテムの所持数を増減させた場合には
アイテムウィンドウの更新が必要です。
更新しないと画面上の数字に反映されません。

プラグインパラメータで一律で自動更新を設定できますが、以下のプラグイン
コマンドでも更新することができます。

     ME_アイテムウィンドウを更新する
     ME_REFRESH_ITEM_WINDOW


-----------------------------------------------------------------------------
サブコマンドプラグイン(FTKR_ItemSubCommand.js)と併用する場合
-----------------------------------------------------------------------------
サブコマンドプラグインと併用する場合に、サブコマンドで実行するコモンイベントも
メニュー画面上で実行可能です。

サブコマンドのイベントの場合は、以下のプラグインコマンドをイベントの最後に
追加してください。

     ME_サブコマンド選択に戻る
     ME_ACTIVATE_SUB_WINDOW

ただし、サブコマンドイベント実行中に、選択中のアイテムの所持数が０になった場合は
サブコマンド選択画面ではなく、アイテム選択画面に自動的に戻ります。


上記プラグインコマンドの変わりに以下の、プラグインコマンドを使うことも
可能です。

     ME_アイテム選択に戻る
     ME_ACTIVATE_ITEM_WINDOW

この場合、イベント終了後にサブコマンドを閉じて、アイテム選択に戻ります。


-----------------------------------------------------------------------------
参考情報１：動作確認済みのイベントコマンド
-----------------------------------------------------------------------------
・変数の操作
・ウェイト
・メッセージの表示(文章、選択肢、数値入力、アイテム選択、スクロール)
・ピクチャの表示・消去


-----------------------------------------------------------------------------
参考情報２：メッセージウィンドウとピクチャの表示優先度について
-----------------------------------------------------------------------------
イベントコマンドで表示可能な、メッセージウィンドウとピクチャの表示優先度は
以下の通りです。(デフォルト設定の場合)

   優先度小------------------------------優先度大
   メニュー画面 ＜ メッセージウィンドウ ＜ ピクチャ

優先度が大きい方が、重なったときに前面に表示されます。

プラグインパラメータ「Display priority」で、メッセージウィンドウとピクチャの
表示優先度を変更することができます。


-----------------------------------------------------------------------------
参考情報３：実行できないイベントコマンド
-----------------------------------------------------------------------------
・タイマーの操作
・アニメーションの表示
・イベントやプレイヤーを対象とした移動、表示操作


-----------------------------------------------------------------------------
！！メッセージウィンドウを前面表示にした場合の注意点！！
-----------------------------------------------------------------------------
メッセージウィンドウの透過度によっては、背面側のメニュー画面が透過して見える
ようになります。
(通常、ウィンドウ同士が重なった場合は、背面側のウィンドウは見えない)

透過して見えないようにしたい場合は、ウィンドウの背面にピクチャを表示して
メニュー画面を隠すなどしてください。


この設定の場合、プラグインパラメータ「Menu Message Window」で
以下のウィンドウの設定を変更できます。
※ウィンドウごとに個別に設定することはできません。

   <対象ウィンドウ>
     メッセージウィンドウ
     選択肢ウィンドウ
     数値入力ウィンドウ
     アイテム選択ウィンドウ
     スクロールウィンドウ(フォントサイズ、行の高さのみ有効)

他のメッセージ系のプラグインと競合する場合には、「Menu Message Window」の
パラメータの入力を「テキスト」に選択し、空欄にしてください。


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

v1.1.0 - 2018/10/05 : 機能追加
   1. メッセージウィンドウの設定を無効にする機能を追加。

v1.0.3 - 2018/02/20 : 不具合修正
   1. 範囲が「なし」のアイテムのコモンイベントで、メッセージウィンドウを
      表示させたときに、イベントを正しく実行できない不具合を修正。

v1.0.2 - 2017/12/02 : 仕様変更, 機能追加
   1. コモンイベント実行時に選択中のアイテムの所持数が０になった場合、
      アイテム選択画面に戻るように修正。
   2. 選択画面に戻るときに、アイテムリスト画面を更新する処理を追加。
   3. メニュー上のイベント実行可否について、アイテム使用時と、サブコマンドの
      カスタムコマンド実行時で、別に設定できるように変更。
   4. アイテムウィンドウの自動更新機能およびプラグインコマンド追加。
   5. メニュー表示中のタイマー機能を削除。

v1.0.1 - 2017/11/28 : 不具合修正、機能追加。
   1. プラグインコマンドの不具合修正。
   2. Menu Message Windowを空欄にした場合に、機能を無効にするように修正。

v1.0.0 - 2017/11/27 : 初版作成

-----------------------------------------------------------------------------

@param Enable Item Event
@desc アイテムイベントのメニュー表示中の動作を設定します。
@default false
@type boolean
@on メニューで実行
@off マップで実行

@param Enable Item SubCom Event
@desc アイテムのサブコマンドで実行するコモンイベントのメニュー表示中の動作を設定します。
@default false
@type boolean
@on メニューで実行
@off マップで実行

@param Enable Skill Event
@desc スキルイベントのメニュー表示中の動作を設定します。
@default false
@type boolean
@on メニューで実行
@off マップで実行

@param Display Priority
@desc メッセージウィンドウとピクチャのどちらを前面に表示するか設定します。
@default false
@type boolean
@on メッセージウィンドウ
@off ピクチャ

@param Auto Refresh Item Window
@desc コモンイベント実行時にアイテムウィンドウを自動更新するか設定します。
@default false
@type boolean
@on 自動更新ON
@off 自動更新OFF

@param Enabled Message Window Setting
@desc メニュー画面で表示するメッセージウィンドウの設定を有効にします。
@default false
@type boolean
@on 有効
@off 無効

@param Menu Message Window
@desc メニュー画面で表示するメッセージウィンドウを設定します。 ※メッセージウィンドウ前面設定の時のみ有効
@default {"Window_Skin":"Window","Font_Size":"28","Window_Padding":"18","Window_Line_Height":"36","Window_Opacity":"192","Hide_Window_Frame":"false"}
@type struct<menu>
*/


/*~struct~menu:ja
@param Window_Skin
@desc ウィンドウスキンに使用する画像
@default Window
@type file
@require 1
@dir img/system/

@param Font_Size
@desc フォントサイズ
@default 28
@type number

@param Window_Padding
@desc ウィンドウの周囲の余白
@default 18
@type number
@min 0

@param Window_Line_Height
@desc ウィンドウ内の1行の高さ
@default 36
@type number

@param Window_Opacity
@desc ウィンドウ内の背景の透明度 0 - 透明, 255 - 不透明
@default 192
@type number
@min 0
@max 255

@param Hide_Window_Frame
@desc ウィンドウ枠を非表示にするか
@default false
@type boolean
@on 非表示にする
@off 表示する
*/

function Game_Menu() {
    this.initialize.apply(this, arguments);
}

(function () {

    var paramParse = function (obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace), paramRevive);
    }

    var paramReplace = function (key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    var paramRevive = function (key, value) {
        try {
            if (value === 'Window') return value;
            return eval(value || value);
        } catch (e) {
            return value;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_MenuEvent');

    FTKR.ME = {
        item: JSON.parse(parameters['Enable Item Event'] || false),
        itemSub: JSON.parse(parameters['Enable Item SubCom Event'] || false),
        skill: JSON.parse(parameters['Enable Skill Event'] || false),
        priority: JSON.parse(parameters['Display Priority'] || false),
        refresh: JSON.parse(parameters['Auto Refresh Item Window'] || false),
        message: paramParse(parameters['Menu Message Window']),
        enabledSetting: paramParse(parameters['Enabled Message Window Setting']) || false,
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _ME_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _ME_DataManager_createGameObjects.call(this);
        $gameMenu = new Game_Menu();
    };

    //=============================================================================
    // プラグインコマンド
    //=============================================================================

    var _ME_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _ME_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/ME_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case 'アクター選択に戻る':
            case 'ACTIVATE_ACTOR_WINDOW':
                if (!$gameParty.inBattle() &&
                    SceneManager._scene._actorWindow) {
                    if (!$gameParty.hasItem(SceneManager._scene.item())) {
                        SceneManager._scene._actorWindow.hide();
                        if (FTKR.ME.refresh) SceneManager._scene._itemWindow.refresh();
                        SceneManager._scene._itemWindow.activate();
                    } else {
                        if (FTKR.ME.refresh) SceneManager._scene._itemWindow.refresh();
                        SceneManager._scene._actorWindow.activate();
                    }
                }
                break;
            case 'アイテム選択に戻る':
            case 'ACTIVATE_ITEM_WINDOW':
            case 'スキル選択に戻る':
            case 'ACTIVATE_SKILL_WINDOW':
                if (!$gameParty.inBattle()) {
                    if (Imported.FTKR_ISC && SceneManager._scene._subCommandWindow) {
                        SceneManager._scene._subCommandWindow.hide();
                    }
                    if (SceneManager._scene._itemWindow) {
                        if (FTKR.ME.refresh) SceneManager._scene._itemWindow.refresh();
                        SceneManager._scene._itemWindow.activate();
                    }
                }
                break;
            case 'サブコマンド選択に戻る':
            case 'ACTIVATE_SUB_WINDOW':
                if (!$gameParty.inBattle() && Imported.FTKR_ISC &&
                    SceneManager._scene._subCommandWindow) {
                    if (!$gameParty.hasItem(SceneManager._scene._subCommandWindow._item)) {
                        SceneManager._scene._subCommandWindow.hide();
                        if (FTKR.ME.refresh) SceneManager._scene._itemWindow.refresh();
                        SceneManager._scene._itemWindow.activate();
                    } else {
                        if (FTKR.ME.refresh) SceneManager._scene._itemWindow.refresh();
                        SceneManager._scene._subCommandWindow.activate();
                    }
                }
                break;
            case 'アイテムウィンドウを更新する':
            case 'REFRESH_ITEM_WINDOW':
                if (SceneManager._scene._itemWindow) SceneManager._scene._itemWindow.refresh();
                break;
        }
    };

    //=============================================================================
    // メニュー画面上でコモンイベントを動かすためのクラス
    // Game_Menu
    //=============================================================================

    Game_Menu.prototype.initialize = function () {
        this._interpreter = new Game_Interpreter();
        this._active = false;
    };

    Game_Menu.prototype.update = function (sceneActive) {
        if (sceneActive) {
            this._active = true;
            this.updateInterpreter();
        } else {
            this._active = false;
        }
    };

    Game_Menu.prototype.updateInterpreter = function () {
        for (; ;) {
            this._interpreter.update();
            if (this._interpreter.isRunning()) {
                return;
            }
            if (!this.setupStartingEvent()) {
                return;
            }
        }
    };

    Game_Menu.prototype.setupStartingEvent = function () {
        if (this._interpreter.setupReservedCommonEvent()) {
            return true;
        }
        if (this.setupTestEvent()) {
            return true;
        }
        return false;
    };

    Game_Menu.prototype.setupTestEvent = function () {
        if ($testEvent) {
            this._interpreter.setup($testEvent, 0);
            $testEvent = null;
            return true;
        }
        return false;
    };

    //=============================================================================
    // Scene_ItemBase
    //=============================================================================

    Scene_ItemBase.prototype.isEnabledSkillEvent = function () {
        return !!this._skillTypeWindow && FTKR.ME.skill;
    };

    Scene_ItemBase.prototype.isEnabledItemEvent = function () {
        return !!this._categoryWindow && !!this._itemWindow && FTKR.ME.item &&
            !(this._subCommandWindow && this._subCommandWindow.item() && /custom(\d+)/i.test(this._subCommandWindow.item().symbol));
    };

    Scene_ItemBase.prototype.isEnabledItemSubComEvent = function () {
        return !!this._categoryWindow && !!this._itemWindow && FTKR.ME.itemSub &&
            this._subCommandWindow && this._subCommandWindow.item() && /custom(\d+)/i.test(this._subCommandWindow.item().symbol);
    };

    Scene_ItemBase.prototype.isEnabledME = function () {
        return this.isEnabledItemEvent() || this.isEnabledSkillEvent() || this.isEnabledItemSubComEvent();
    };

    var _ME_Scene_ItemBase_initialize = Scene_ItemBase.prototype.initialize;
    Scene_ItemBase.prototype.initialize = function () {
        this._waitCount = 0;
        _ME_Scene_ItemBase_initialize.call(this);
    };

    var _ME_Scene_ItemBase_update = Scene_ItemBase.prototype.update;
    Scene_ItemBase.prototype.update = function () {
        if (this.isEnabledME()) {
            this.updateMain();
            this.updateWaitCount();
        }
        _ME_Scene_ItemBase_update.call(this);
    };

    Scene_ItemBase.prototype.updateMain = function () {
        var active = this.isActive();
        $gameMenu.update(active);
        $gameScreen.update();
    };

    Scene_ItemBase.prototype.isBusy = function () {
        return ((this._messageWindow && this._messageWindow.isClosing()) ||
            this._waitCount > 0 ||
            Scene_Base.prototype.isBusy.call(this));
    };

    Scene_ItemBase.prototype.updateWaitCount = function () {
        if (this._waitCount > 0) {
            this._waitCount--;
            return true;
        }
        return false;
    };

    Scene_ItemBase.prototype.createMenuEventWindow = function () {
        this.createSpriteset();
        if (FTKR.ME.priority) {
            this.createMessageLayer();
            this.createMessageWindow2();
            this.createScrollTextWindow2();
        } else {
            this.createMessageWindow();
            this.createScrollTextWindow();
        }
    };

    Scene_ItemBase.prototype.createSpriteset = function () {
        this._spriteset = new Spriteset_Menu();
        this.addChild(this._spriteset);
    };

    Scene_ItemBase.prototype.createMessageWindow = function () {
        this._messageWindow = new Window_Message();
        this.addWindow(this._messageWindow);
        this._messageWindow.subWindows().forEach(function (window) {
            this.addWindow(window);
        }, this);
    };

    Scene_ItemBase.prototype.createScrollTextWindow = function () {
        this._scrollTextWindow = new Window_ScrollText();
        this.addWindow(this._scrollTextWindow);
    };

    Scene_ItemBase.prototype.createMessageLayer = function () {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        this._messageLayer = new WindowLayer();
        this._messageLayer.move(x, y, width, height);
        this.addChild(this._messageLayer);
    };

    Scene_ItemBase.prototype.createMessageWindow2 = function () {
        this._messageWindow = FTKR.ME.enabledSetting ?
            new Window_MenuMessage() : new Window_Message();
        this.addMessage(this._messageWindow);
        this._messageWindow.subWindows().forEach(function (window) {
            this.addMessage(window);
        }, this);
    };

    Scene_ItemBase.prototype.createScrollTextWindow2 = function () {
        this._scrollTextWindow = FTKR.ME.enabledSetting ?
            new Window_MenuScrollText() : new Window_ScrollText();
        this.addMessage(this._scrollTextWindow);
    };

    Scene_ItemBase.prototype.addMessage = function (window) {
        this._messageLayer.addChild(window);
    };

    var _ME_Scene_ItemBase_activateItemWindow = Scene_ItemBase.prototype.activateItemWindow;
    Scene_ItemBase.prototype.activateItemWindow = function () {
        this._itemWindow.refresh();
        if (!$gameTemp.isCommonEventReserved()) {
            _ME_Scene_ItemBase_activateItemWindow.call(this);
        }
    };

    //=============================================================================
    // Scene_Item
    //=============================================================================

    var _ME_Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        _ME_Scene_Item_create.call(this);
        if (FTKR.ME.item || FTKR.ME.itemSub) {
            this.createMenuEventWindow();
        }
    };

    Scene_Item.prototype.checkCommonEvent = function () {
        if ($gameTemp.isCommonEventReserved()) {
            if (this.isEnabledItemEvent() || this.isEnabledItemSubComEvent()) {
                this._itemWindow.deactivate();
                this._actorWindow.deactivate();
            } else {
                SceneManager.goto(Scene_Map);
            }
        }
    };

    //=============================================================================
    // Scene_Skill
    //=============================================================================

    var _ME_Scene_Skill_create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function () {
        _ME_Scene_Skill_create.call(this);
        if (FTKR.ME.skill) {
            this.createMenuEventWindow();
        }
    };

    Scene_Skill.prototype.checkCommonEvent = function () {
        if ($gameTemp.isCommonEventReserved()) {
            if (this.isEnabledSkillEvent()) {
                this._itemWindow.deactivate();
                this._actorWindow.deactivate();
            } else {
                SceneManager.goto(Scene_Map);
            }
        }
    };

    //=============================================================================
    // Spriteset_Menu
    //=============================================================================

    function Spriteset_Menu() {
        this.initialize.apply(this, arguments);
    }

    Spriteset_Menu.prototype = Object.create(Spriteset_Base.prototype);
    Spriteset_Menu.prototype.constructor = Spriteset_Menu;

    Spriteset_Menu.prototype.initialize = function () {
        Sprite.prototype.initialize.call(this);
        this.setFrame(0, 0, Graphics.width, Graphics.height);
        this._tone = [0, 0, 0, 0];
        this.opaque = true;
        this.createLowerLayer();
        this.createToneChanger();
        this.createUpperLayer();
        this.update();
    };

    Spriteset_Menu.prototype.createBaseSprite = function () {
        this._baseSprite = new Sprite();
        this._baseSprite.setFrame(0, 0, this.width, this.height);
        this.addChild(this._baseSprite);
    };

    Spriteset_Menu.prototype.createUpperLayer = function () {
        this.createPictures();
        this.createScreenSprites();
    };

    //=============================================================================
    // Window_MenuMessage
    //=============================================================================

    function Window_MenuMessage() {
        this.initialize.apply(this, arguments);
    }

    Window_MenuMessage.prototype = Object.create(Window_Message.prototype);
    Window_MenuMessage.prototype.constructor = Window_MenuMessage;

    Window_MenuMessage.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem(FTKR.ME.message.Window_Skin);
    };

    Window_MenuMessage.prototype.standardFontSize = function () {
        return FTKR.ME.message.Font_Size;
    };

    Window_MenuMessage.prototype.standardPadding = function () {
        return FTKR.ME.message.Window_Padding;
    };

    Window_MenuMessage.prototype.lineHeight = function () {
        return FTKR.ME.message.Window_Line_Height;
    };

    Window_MenuMessage.prototype.standardBackOpacity = function () {
        return FTKR.ME.message.Window_Opacity;
    };

    Window_MenuMessage.prototype._refreshFrame = function () {
        if (!FTKR.ME.message.Hide_Window_Frame) Window.prototype._refreshFrame.call(this);
    };

    Window_MenuMessage.prototype.createSubWindows = function () {
        this._goldWindow = new Window_Gold(0, 0);
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        this._goldWindow.openness = 0;
        this._choiceWindow = new Window_MenuChoiceList(this);
        this._numberWindow = new Window_MenuNumberInput(this);
        this._itemWindow = new Window_MenuEventItem(this);
    };

    //=============================================================================
    // Window_MenuNumberInput
    //=============================================================================

    function Window_MenuNumberInput() {
        this.initialize.apply(this, arguments);
    }

    Window_MenuNumberInput.prototype = Object.create(Window_NumberInput.prototype);
    Window_MenuNumberInput.prototype.constructor = Window_MenuNumberInput;

    Window_MenuNumberInput.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem(FTKR.ME.message.Window_Skin);
    };

    Window_MenuNumberInput.prototype.standardFontSize = function () {
        return FTKR.ME.message.Font_Size;
    };

    Window_MenuNumberInput.prototype.standardPadding = function () {
        return FTKR.ME.message.Window_Padding;
    };

    Window_MenuNumberInput.prototype.lineHeight = function () {
        return FTKR.ME.message.Window_Line_Height;
    };

    Window_MenuNumberInput.prototype.standardBackOpacity = function () {
        return FTKR.ME.message.Window_Opacity;
    };

    Window_MenuNumberInput.prototype._refreshFrame = function () {
        if (!FTKR.ME.message.Hide_Window_Frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_MenuChoiceList
    //=============================================================================

    function Window_MenuChoiceList() {
        this.initialize.apply(this, arguments);
    }

    Window_MenuChoiceList.prototype = Object.create(Window_ChoiceList.prototype);
    Window_MenuChoiceList.prototype.constructor = Window_MenuChoiceList;

    Window_MenuChoiceList.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem(FTKR.ME.message.Window_Skin);
    };

    Window_MenuChoiceList.prototype.standardFontSize = function () {
        return FTKR.ME.message.Font_Size;
    };

    Window_MenuChoiceList.prototype.standardPadding = function () {
        return FTKR.ME.message.Window_Padding;
    };

    Window_MenuChoiceList.prototype.lineHeight = function () {
        return FTKR.ME.message.Window_Line_Height;
    };

    Window_MenuChoiceList.prototype.standardBackOpacity = function () {
        return FTKR.ME.message.Window_Opacity;
    };

    Window_MenuChoiceList.prototype._refreshFrame = function () {
        if (!FTKR.ME.message.Hide_Window_Frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_MenuEventItem
    //=============================================================================

    function Window_MenuEventItem() {
        this.initialize.apply(this, arguments);
    }

    Window_MenuEventItem.prototype = Object.create(Window_EventItem.prototype);
    Window_MenuEventItem.prototype.constructor = Window_MenuEventItem;

    Window_MenuEventItem.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem(FTKR.ME.message.Window_Skin);
    };

    Window_MenuEventItem.prototype.standardFontSize = function () {
        return FTKR.ME.message.Font_Size;
    };

    Window_MenuEventItem.prototype.standardPadding = function () {
        return FTKR.ME.message.Window_Padding;
    };

    Window_MenuEventItem.prototype.lineHeight = function () {
        return FTKR.ME.message.Window_Line_Height;
    };

    Window_MenuEventItem.prototype.standardBackOpacity = function () {
        return FTKR.ME.message.Window_Opacity;
    };

    Window_MenuEventItem.prototype._refreshFrame = function () {
        if (!FTKR.ME.message.Hide_Window_Frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_MenuScrollText
    //=============================================================================

    function Window_MenuScrollText() {
        this.initialize.apply(this, arguments);
    }

    Window_MenuScrollText.prototype = Object.create(Window_ScrollText.prototype);
    Window_MenuScrollText.prototype.constructor = Window_MenuScrollText;

    Window_MenuScrollText.prototype.standardFontSize = function () {
        return FTKR.ME.message.Font_Size;
    };

    Window_MenuScrollText.prototype.lineHeight = function () {
        return FTKR.ME.message.Window_Line_Height;
    };


}());//EOF