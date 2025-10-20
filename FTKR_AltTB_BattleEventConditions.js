//=============================================================================
// バトルイベントにFTKR_AltTB専用のターン条件を設定できるプラグイン
// FTKR_AltTB_BattleEventConditions.js
// プラグインNo : 93
// 作成者　　   : フトコロ
// 作成日　　   : 2018/12/02
// 最終更新日   : 2018/12/04
// バージョン   : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_AltTB_BEC = true;

var FTKR = FTKR || {};
FTKR.AltTB = FTKR.AltTB || {};
FTKR.AltTB.BEC = FTKR.AltTB.BEC || {};

//=============================================================================
/*:
@plugindesc v1.0.1 You can set turn conditions specific to FTKR_AltTB in battle events.
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
You can set turn conditions specific to FTKR_AlternatingTurnBattle for battle events set for Troops.

This plugin requires FTKR_AlternatingTurnBattle.js (v2.0.0 or later).

For instructions on how to use the plugin, see the online manual page below.
https://github.com/futokoro/RPGMaker/blob/master/FTKR_AltTB_BattleEventConditions.ja.md

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. When combining with the following plugins, be sure to pay attention to the order of plugin management.

FTKR_AlternatingTurnBattle.js
↑Register above this plugin↑
FTKR_AltTB_SelectTouchedActor.js

---------------------------------------------------------------------------
License for this plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin publisher
https://github.com/futokoro/RPGMaker/blob/master/README.md

----------------------------------------------------------------------------
Change History
----------------------------------------------------------------------------

v1.0.1 - 2018/12/04: Bug Fixes
1. Fixed an issue where some battle event conditions were not Reflectioned.

v1.0.0 - December 2, 2018: First version created

-----------------------------------------------------------------------------
*/


/*:ja
@plugindesc v1.0.1 バトルイベントにFTKR_AltTB専用のターン条件を設定できる
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
敵グループに設定したバトルイベントの実行条件に
FTKR_AlternatingTurnBattle専用のターン条件を設定できます。

このプラグインには、FTKR_AlternatingTurnBattle.js (v2.0.0以降)が必要です。

プラグインの使い方は、下のオンラインマニュアルページを見てください。
https://github.com/futokoro/RPGMaker/blob/master/FTKR_AltTB_BattleEventConditions.ja.md


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。

   FTKR_AlternatingTurnBattle.js
   ↑このプラグインよりも上に登録↑
   FTKR_AltTB_SelectTouchedActor.js


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。

Copyright (c) 2018 Futokoro
http://opensource.org/licenses/mit-license.php


プラグイン公開元
https://github.com/futokoro/RPGMaker/blob/master/README.md


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.0.1 - 2018/12/04 : 不具合修正
   1. バトルイベントの条件が一部反映されない不具合を修正。

v1.0.0 - 2018/12/02 : 初版作成

-----------------------------------------------------------------------------
*/

//=============================================================================

if (Imported.FTKR_AltTB) (function () {

    var readCommentMeta = function (comment, metacodes) {
        if (!comment) return false;
        return metacodes.some(function (metacode) {
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(comment);
        });
    };

    var readPagesCommentMetadata = function (obj, page) {
        for (var v = 0; v < page.list.length; v++) {
            var list = page.list[v];
            if (list && ([108, 408].contains(list.code))) {
                var comment = list.parameters[0];
                var pc = page.conditions;
                if (readCommentMeta(comment, ['ターン開始', 'TURN_STARTING'])) {
                    pc.turnStarting = true;
                }
                if (readCommentMeta(comment, ['プレイヤーターン開始', 'PLAYER_TURN_STARTING'])) {
                    pc.playerTurnStarting = true;
                }
                if (readCommentMeta(comment, ['プレイヤーターン終了', 'PLAYER_TURN_ENDING'])) {
                    pc.playerTurnEnding = true;
                }
                if (readCommentMeta(comment, ['エネミーターン開始', 'ENEMY_TURN_STARTING'])) {
                    pc.enemyTurnStarting = true;
                }
                if (readCommentMeta(comment, ['エネミーターン終了', 'ENEMY_TURN_ENDING'])) {
                    pc.enemyTurnEnding = true;
                }
            }
        }
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _DatabaseLoaded = false;
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_DatabaseLoaded) {
            this.readPagesCommentMetadata($dataTroops);
            _DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.readPagesCommentMetadata = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var pages = obj.pages;
            if (!obj.name) continue;
            for (var i = 0; i < pages.length; i++) {
                readPagesCommentMetadata(obj, pages[i]);
            }
        }
    };

    //=============================================================================
    // Game_Troop
    //=============================================================================

    var _Game_Troop_meetsConditions = Game_Troop.prototype.meetsConditions;
    Game_Troop.prototype.meetsConditions = function (page) {
        var c = page.conditions;
        if (!_Game_Troop_meetsConditions.call(this, page)) {
            return false;
        }
        if (c.turnStarting) {
            if (!BattleManager.isTurnStart()) {
                return false;
            }
        }
        if (c.playerTurnStarting) {
            if (!BattleManager.isPlayerTurnStart()) {
                return false;
            }
        }
        if (c.playerTurnEnding) {
            if (!BattleManager.isPlayerTurnEnd()) {
                return false;
            }
        }
        if (c.enemyTurnStarting) {
            if (!BattleManager.isEnemyTurnStart()) {
                return false;
            }
        }
        if (c.enemyTurnEnding) {
            if (!BattleManager.isEnemyTurnEnd()) {
                return false;
            }
        }
        return true;
    };

}());//EOF