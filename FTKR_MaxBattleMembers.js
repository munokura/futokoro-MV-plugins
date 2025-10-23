//=============================================================================
// バトルメンバーの最大人数を変数で管理するプラグイン
// FTKR_MaxBattleMembers.js
// プラグインNo : 68
// 作成者     : フトコロ
// 作成日     : 2018/02/25
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_MBM = true;

var FTKR = FTKR || {};
FTKR.MBM = FTKR.MBM || {};

//=============================================================================
/*:
@plugindesc v1.0.0 A plugin that manages the maximum number of battle members with variables
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
You can change the number of battle members during a game without changing the number of party members.

The value stored in the variable <VariableId> specified in the plugin parameters
will be the number of battle members at that time.

Set the initial maximum number of players in <Initial Value>.
The value set when starting a new game will be written to the variable.

-----------------------------------------------------------------------------
Settings
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

-----------------------------------------------------------------------------
License for this plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin source
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.0.0 - February 25, 2018: First version created

-----------------------------------------------------------------------------

@param VariableId
@desc Set the variable ID that manages the maximum number of battle members.
@default 0
@type variable
@parent database

@param Initial Value
@desc Set the initial maximum number of battle members.
@default 4
@type number
@min 1
@parent dataType
*/


/*:ja
@plugindesc v1.0.0 バトルメンバーの最大人数を変数で管理するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
ゲーム中にパーティーの人数を変えずに、バトルメンバーの人数を変更できます。

プラグインパラメータで指定した変数<VariableId>に格納した値が
そのときのバトルメンバーの人数になります。

初期の最大人数は<Initial Value>で設定してください。
ニューゲーム開始時に設定した値を変数に書き込みます。


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

v1.0.0 - 2018/02/25 : 初版作成

-----------------------------------------------------------------------------

@param VariableId
@desc バトルメンバーの最大数を管理する変数IDを設定します。
@default 0
@type variable
@parent database

@param Initial Value
@desc バトルメンバーの最大数の初期値を設定します。
@default 4
@type number
@min 1
@parent dataType
*/

//=============================================================================

(function () {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_MaxBattleMembers');

    FTKR.MBM = {
        variableId: Number(parameters['VariableId'] || 0),
        initValue: Number(parameters['Initial Value'] || 1),
    };

    var _MBM_DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        _MBM_DataManager_setupNewGame.call(this);
        if (FTKR.MBM.variableId) $gameVariables.setValue(FTKR.MBM.variableId, FTKR.MBM.initValue);
    };

    //=============================================================================
    // Game_Party
    //=============================================================================

    Game_Party.prototype.maxBattleMembers = function () {
        var vid = FTKR.MBM.variableId;
        var value = FTKR.MBM.initValue;
        if (vid) {
            var num = $gameVariables.value(vid);
            if (num > 0) {
                return num;
            } else {
                $gameVariables.setValue(vid, value);
            }
        }
        return value;
    };


}());//EOF