//=============================================================================
// 指定したリージョンの通行設定を一時的に変更するプラグイン
// FTKR_ExTileSettingForRegion.js
// プラグインNo : 55
// 作成者     : フトコロ
// 作成日     : 2017/08/27
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ExTileSettingForRegion = true;

var FTKR = FTKR || {};
FTKR.ETR = FTKR.ETR || {};

//=============================================================================
/*:
@plugindesc v1.0.0 A plugin that temporarily changes the traffic settings of a specified region
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
Temporarily changes the passage settings for tiles with a specified region ID by turning the switch ON/OFF.

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

-----------------------------------------------------------------------------
License for this Plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.0.0 - 2017/08/27: First version created

----------------------------------------------------------------------------

@param スイッチID
@text Switch ID
@desc While the specified switch ID is ON, the region's pass settings will change.
@type switch

@param リージョンID
@text Region ID
@desc The pass settings for tiles with the specified region ID will change.
@type number

@param 通行設定
@text Traffic Settings
@desc Specify the region's access settings.
@default 通行可
@type select
@option Passivle
@value 通行可
@option Impassable
@value 通行不可
*/

/*:ja
@plugindesc v1.0.0 指定したリージョンの通行設定を一時的に変更するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
指定したリージョンIDを設定したタイルの通行設定を
スイッチのON/OFFで一時的に変更します。


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

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.0.0 - 2017/08/27 : 初版作成

-----------------------------------------------------------------------------

@param スイッチID
@text スイッチID
@desc 指定したスイッチIDがONの間、リージョンの通行設定が変わります
@type switch

@param リージョンID
@text リージョンID
@desc 指定したリージョンIDのタイルの通行設定が変わります
@type number

@param 通行設定
@text 通行設定
@desc リージョンの通行設定を指定してください。
@default 通行可
@type select
@option 通行可
@option 通行不可
*/

//=============================================================================

(function () {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExTileSettingForRegion');

    FTKR.ETR = {
        switchId: Number(parameters['スイッチID'] || 0),
        regionId: Number(parameters['リージョンID'] || 0),
        passage: String(parameters['通行設定'] || '通行可'),
    };

    _ETR_Game_Map_isPassable = Game_Map.prototype.isPassable;
    Game_Map.prototype.isPassable = function (x, y, d) {
        return this.checkETR(x, y) ? this.checkETRPassage() :
            _ETR_Game_Map_isPassable.call(this, x, y, d);
    };

    Game_Map.prototype.checkETR = function (x, y) {
        return this.checkETRRegionId(x, y) && this.checkETRSwitchId();
    };

    Game_Map.prototype.checkETRRegionId = function (x, y) {
        return FTKR.ETR.regionId && this.regionId(x, y) === FTKR.ETR.regionId;
    };

    Game_Map.prototype.checkETRSwitchId = function () {
        return FTKR.ETR.switchId && $gameSwitches.value(FTKR.ETR.switchId);
    };

    Game_Map.prototype.checkETRPassage = function () {
        return FTKR.ETR.passage === '通行可';
    };

}());//EOF