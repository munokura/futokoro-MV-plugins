//=============================================================================
// バトル中の各種速度を変更するプラグイン
// FTKR_ChangeBattleSpeed.js
// プラグインNo : 71
// 作成者     : フトコロ
// 作成日     : 2018/02/26
// 最終更新日 : 2019/04/07
// バージョン : v1.0.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CBS = true;

var FTKR = FTKR || {};
FTKR.CBS = FTKR.CBS || {};

//=============================================================================
/*:
@plugindesc v1.0.3 Plugin to change various speeds during battle
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
You can use in-game variables to manage the following processing times during battle.

Changeable Processing
- Battlelog display time (MV default: 16)
- Animation start delay (MV default: 8)
- Animation frame display time (MV default: 4)
- Enemy animation start delay (not included in MV default)
- Damage popup delay (MV default: 90)
- Enemy normal character disappearance delay (MV default: 32)

If you do not specify a variable ID (variableId) in the plugin parameters,
the default value (initValue) will be used.

If you do not set an initial value (leave it blank), the MV default value will be used.

The delay before enemy animation starts is calculated as
"Delay before animation starts" +
"Delay before enemy animation starts"

The "Delay before animation start" setting is also used by actors.
If you want to slow down only enemy actions, adjust the "Delay before enemy animation start."

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

-----------------------------------------------------------------------------
License for this plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT license.

Copyright (c) 2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin Publisher
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.0.3 - 2019/04/07: Bug Fixes
1. Fixed an issue where the function to set the initial value without setting a variable ID was not properly applied. (Provided by Utako)

v1.0.2 - 2018/02/27: Specification Changes
1. Changed the plugin to use a fixed initial value if a variable ID is not set in the plugin parameters.

v1.0.1 - 2018/02/27: Traits Additions
1. Added a function to change the delay time before enemy animation starts.

v1.0.0 - February 26, 2018: Initial release

-----------------------------------------------------------------------------

@param Message Speed
@desc Sets the display speed of the battle log.
@default {"variableId":"0","initValue":"16"}
@type struct<variable>

@param Aniamtion Base Delay
@desc Sets the wait time before playing the animation.
@default {"variableId":"0","initValue":"8"}
@type struct<variable>

@param Animation Next Delay
@desc Sets the playback wait time for the second character and beyond when displaying animations separately for multiple targets.
@default {"variableId":"0","initValue":"12"}
@type struct<variable>

@param Aniamtion Enemy Delay
@desc Sets the wait time before the enemy plays its animation. This is processed separately from Base Delay.
@default {"variableId":"0","initValue":"0"}
@type struct<variable>

@param Animation Rate
@desc Set the display time for each frame of the animation.
@default {"variableId":"0","initValue":"4"}
@type struct<variable>

@param Damage Popup Duration
@desc Sets the damage popup time.
@default {"variableId":"0","initValue":"90"}
@type struct<variable>

@param Enemy Collapse Duration
@desc Set the time for Enemies to disappear.
@default {"variableId":"0","initValue":"32"}
@type struct<variable>
*/


/*~struct~variable:
@param variableId
@desc Set the variable ID that manages the numerical value.
@default 0
@type variable

@param initValue
@desc Sets the initial value of a variable.
@default 1
@type number
@min 1
*/


/*:ja
@plugindesc v1.0.3 バトル中の各種速度を変更するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
バトル中の以下の各処理時間をゲーム内変数で管理することができます。

変更可能な処理
・バトルログの表示時間　　　　　　　　　　　（MVデフォルト：16）
・アニメーションを開始するまでのディレイ時間（MVデフォルト：8）
・アニメーションのフレームごとの表示時間　　（MVデフォルト：4）
・敵のアニメーション開始前のディレイ時間　　（MVデフォルトにはありません）
・ダメージポップアップの時間　　　　　　　　（MVデフォルト：90）
・敵通常キャラの消滅時間　　　　　　　　　　（MVデフォルト：32）

プラグインパラメータで、変数ID(variableId)を指定しない場合は
初期値(initValue)を固定で使用します。

初期値も設定しない(空欄にする)場合は、MVデフォルトの値を使用します。


なお、敵のアニメーションを開始する前のディレイ時間は
「アニメーションを開始するまでのディレイ時間」+
       「敵のアニメーション開始前のディレイ時間」
という結果になります。

「アニメーションを開始するまでのディレイ時間」はアクターも使用するため
敵の行動だけ遅くしたい場合は、「敵のアニメーション開始前のディレイ時間」で
調整してください。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2018 Futokoro
http://opensource.org/licenses/mit-license.php


プラグイン公開元
https://github.com/futokoro/RPGMaker/blob/master/README.md


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.0.3 - 2019/04/07 : 不具合修正
   1. 変数IDを設定せずに初期値を設定する機能が、正しく反映されない不具合を修正。(うたこさんからご提供)

v1.0.2 - 2018/02/27 : 仕様変更
   1. プラグインパラメータで変数IDを設定しない場合に、初期値を設定していれば
      その値を固定で使用するように変更。

v1.0.1 - 2018/02/27 : 機能追加
   1. 敵だけアニメーション開始前のディレイ時間を変更する機能を追加。

v1.0.0 - 2018/02/26 : 初版作成

-----------------------------------------------------------------------------

@param Message Speed
@desc バトルログの表示速度を設定します。
@default {"variableId":"0","initValue":"16"}
@type struct<variable>

@param Aniamtion Base Delay
@desc アニメーションを再生するまでのウェイト時間を設定します。
@default {"variableId":"0","initValue":"8"}
@type struct<variable>

@param Animation Next Delay
@desc 複数の対象に別々にアニメーションを表示する場合の２キャラ目以降の再生ウェイト時間を設定します。
@default {"variableId":"0","initValue":"12"}
@type struct<variable>

@param Aniamtion Enemy Delay
@desc 敵がアニメーションを再生するまでのウェイト時間を設定します。Base Delayと別に処理されます。
@default {"variableId":"0","initValue":"0"}
@type struct<variable>

@param Animation Rate
@desc アニメーションの１フレームごとの表示時間を設定します。
@default {"variableId":"0","initValue":"4"}
@type struct<variable>

@param Damage Popup Duration
@desc ダメージのポップアップ時間を設定します。
@default {"variableId":"0","initValue":"90"}
@type struct<variable>

@param Enemy Collapse Duration
@desc 敵キャラの消滅時間を設定します。
@default {"variableId":"0","initValue":"32"}
@type struct<variable>
*/


/*~struct~variable:ja
@param variableId
@desc 数値を管理する変数IDを設定します。
@default 0
@type variable

@param initValue
@desc 変数の初期値を設定します。
@default 1
@type number
@min 1
*/

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

    var setPluginStructVariable = function (param) {
        param = paramParse(parameters[param]);
        return param instanceof Object ? param : { initValue: 0, variableId: 0 };
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ChangeBattleSpeed');

    FTKR.CBS = {
        messageSpeed: setPluginStructVariable('Message Speed'),
        animationBaseDelay: setPluginStructVariable('Aniamtion Base Delay'),
        animationNextDelay: setPluginStructVariable('Animation Next Delay'),
        animationRate: setPluginStructVariable('Animation Rate'),
        damageDuration: setPluginStructVariable('Damage Popup Duration'),
        collapseDuration: setPluginStructVariable('Enemy Collapse Duration'),
        animationEnemyDelay: setPluginStructVariable('Aniamtion Enemy Delay'),
    };

    var getParamVariableValue = function (param, base) {
        return param.variableId ? $gameVariables.value(param.variableId) :
            !isNaN(param.initValue) ? param.initValue : base;
    };

    var getParamValue = function (param) {
        if (param.variableId) {
            return $gameVariables.value(param.variableId);
        } else if (param.initValue) {
            return param.initValue;
        } else {
            return 0; // or false
        }
    };

    var setParamVariableValue = function (param) {
        if (param.variableId) $gameVariables.setValue(param.variableId, param.initValue);
    };

    var _CBS_DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        _CBS_DataManager_setupNewGame.call(this);
        for (var prop in FTKR.CBS) {
            setParamVariableValue(FTKR.CBS[prop]);
        }
    };

    var _CBS_Window_BattleLog_messageSpeed = Window_BattleLog.prototype.messageSpeed;
    Window_BattleLog.prototype.messageSpeed = function () {
        return getParamVariableValue(FTKR.CBS.messageSpeed, _CBS_Window_BattleLog_messageSpeed.call(this));
    };

    var _CBS_Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
    Window_BattleLog.prototype.showAnimation = function (subject, targets, animationId) {
        this._subject = subject;
        _CBS_Window_BattleLog_showAnimation.call(this, subject, targets, animationId);
    };

    Window_BattleLog.prototype.animationEnemyDelay = function () {
        return getParamVariableValue(FTKR.CBS.animationEnemyDelay, 0);
    };

    var _CBS_Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
    Window_BattleLog.prototype.showEnemyAttackAnimation = function (subject, targets) {
        _CBS_Window_BattleLog_showEnemyAttackAnimation.call(this, subject, targets);
        this._waitCount = this.animationEnemyDelay();
    };

    var _CBS_Window_BattleLog_animationBaseDelay = Window_BattleLog.prototype.animationBaseDelay;
    Window_BattleLog.prototype.animationBaseDelay = function () {
        var delay = this._subject && !this._subject.isActor() ? this.animationEnemyDelay() : 0;
        return delay + getParamVariableValue(FTKR.CBS.animationBaseDelay, _CBS_Window_BattleLog_animationBaseDelay.call(this));
    };

    var _CBS_Window_BattleLog_animationNextDelay = Window_BattleLog.prototype.animationNextDelay;
    Window_BattleLog.prototype.animationNextDelay = function () {
        return getParamVariableValue(FTKR.CBS.animationNextDelay, _CBS_Window_BattleLog_animationNextDelay.call(this));
    };


    var _CBS_Sprite_Enemy_startCollapse = Sprite_Enemy.prototype.startCollapse;
    Sprite_Enemy.prototype.startCollapse = function () {
        _CBS_Sprite_Enemy_startCollapse.call(this);
        var paramValue = getParamValue(FTKR.CBS.collapseDuration);
        if (paramValue) {
            this._effectDuration = paramValue
        }
    };

    var _CBS_Sprite_Animation_initMembers = Sprite_Animation.prototype.initMembers;
    Sprite_Animation.prototype.initMembers = function () {
        _CBS_Sprite_Animation_initMembers.call(this);
        var paramValue = getParamValue(FTKR.CBS.animationRate);
        if (paramValue) {
            this._rate = paramValue;
        }
    };

    var _CBS_Sprite_Animation_setupRate = Sprite_Animation.prototype.setupRate;
    Sprite_Animation.prototype.setupRate = function () {
        var paramValue = getParamValue(FTKR.CBS.animationRate);
        if (paramValue) {
            this._rate = paramValue;
        } else {
            _CBS_Sprite_Animation_setupRate.call(this);
        }
    };

    var _CBS_Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
    Sprite_Damage.prototype.initialize = function () {
        _CBS_Sprite_Damage_initialize.call(this);
        var paramValue = getParamValue(FTKR.CBS.damageDuration);
        if (paramValue) {
            this._duration = paramValue;
        }
    };

}());//EOF