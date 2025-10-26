//=============================================================================
// 同じ装備タイプの装備を２つ以上装備できるようにするプラグイン
// FTKR_ExEquipSlot.js
// プラグインNo : 49
// 作成者     : フトコロ
// 作成日     : 2017/06/30
// 最終更新日 : 2018/12/21
// バージョン : v1.2.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EES = true;

var FTKR = FTKR || {};
FTKR.EES = FTKR.EES || {};

//=============================================================================
/*:
@plugindesc v1.2.1 Allowing you to equip two or more pieces of the same equipment type
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
Allows you to equip more than one piece of the same equipment type.

For instructions on how to use the plugin, see the online manual page below.
https://github.com/futokoro/RPGMaker/blob/master/FTKR_ExEquipSlot.ja.md

-----------------------------------------------------------------------------
Setup Instructions
---------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

---------------------------------------------------------------------------
License for this Plugin
---------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin Publisher
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.2.1 - 2018/12/21: Bug fixes and Traits additions
1. Fixed bugs in the v1.2.0 fixes.
2. Added a Traits to hide the name of the specified equipment type.

v1.2.0 - 2018/12/20: Traits additions
1. Added a Traits to prevent multiple equip of the same weapon and armor type.

v1.1.0 - 2017/12/17: Traits additions
1. Added a Traits to allow players to equip more than one of the same equipment.

v1.0.0 - June 30, 2017: First version created

-----------------------------------------------------------------------------

@param Enable Equip Same Items
@desc Set whether you can equip more than two of the same equipment.
@default true
@type boolean
@on Can be equipped
@off Cannot be equipped

@param Disabled Equip Same WtypeIds
@desc Only one weapon type ID can be equipped.

@param Disabled Equip Same AtypeIds
@desc Only one armor type ID set here can be equipped.

@param Disabled Slot Name
@desc The equipment type name of the equipment type ID set here will not be displayed.
*/


/*:ja
@plugindesc v1.2.1 同じ装備タイプの装備を２つ以上装備できるようにする
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
同じ装備タイプの装備を２つ以上装備できるようにします。


プラグインの使い方は、下のオンラインマニュアルページを見てください。
https://github.com/futokoro/RPGMaker/blob/master/FTKR_ExEquipSlot.ja.md


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

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php


プラグイン公開元
https://github.com/futokoro/RPGMaker/blob/master/README.md


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.2.1 - 2018/12/21 : 不具合修正、機能追加
   1. v1.2.0の修正部の不具合修正。
   2. 指定した装備タイプの名前を表示させない機能を追加。

v1.2.0 - 2018/12/20 : 機能追加
   1. 同じ武器タイプ防具タイプを複数装備させない機能を追加。

v1.1.0 - 2017/12/17 : 機能追加
   1. 同じ装備を２つ以上装備できるか設定する機能を追加。

v1.0.0 - 2017/06/30 : 初版作成

-----------------------------------------------------------------------------

@param Enable Equip Same Items
@desc 同じ装備を２つ以上装備できるか設定する。
@default true
@type boolean
@on 装備できる
@off 装備できない

@param Disabled Equip Same WtypeIds
@desc ここに設定した武器タイプIDは１つしか装備できません。

@param Disabled Equip Same AtypeIds
@desc ここに設定した防具タイプIDは１つしか装備できません。

@param Disabled Slot Name
@desc ここに設定した装備タイプIDの装備タイプ名は表示されません。
*/

//=============================================================================

(function () {

    var splitConvertNumber = function (param) {
        var results = [];
        (param + '').split(',').forEach(function (split) {
            match = /[ ]*(\d+)[ ]*-[ ]*(\d+)/.exec(split);
            if (match) {
                for (var i = Number(match[1]); i <= Number(match[2]); i++) {
                    results.push(i);
                }
            } else {
                if (!isNaN(split)) results.push(Number(split));
            }
        });
        return results;
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExEquipSlot');

    FTKR.EES = {
        enable: JSON.parse(parameters['Enable Equip Same Items'] || 'true'),
        disabledWtpeIds: splitConvertNumber(parameters['Disabled Equip Same WtypeIds'] || ''),
        disabledAtpeIds: splitConvertNumber(parameters['Disabled Equip Same AtypeIds'] || ''),
        disabledSlotName: splitConvertNumber(parameters['Disabled Slot Name'] || ''),
    };

    var sameEquipIds = function (etypeId) {
        var equipIds = [];
        $dataSystem.equipTypes.forEach(function (etype, i) {
            if (etype === $dataSystem.equipTypes[etypeId]) equipIds.push(i);
        });
        return equipIds;
    };

    var matchEquipIds = function (itemEtypeId, slotEtypeId) {
        return sameEquipIds(itemEtypeId).contains(slotEtypeId);
    };

    //objのメモ欄から <metacode> があるか真偽を返す
    var testObjectMeta = function (obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function (metacode) {
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        });
    };

    var enableMultipleEquipment = function (item) {
        if (!item) return false;
        return testObjectMeta(item, ['EES_複数装備可']);
    };

    var disableMultipleEquipment = function (item) {
        if (!item) return true;
        return testObjectMeta(item, ['EES_複数装備不可']);
    };

    //=============================================================================
    // Window_EquipSlot
    //=============================================================================

    var _Window_EquipSlot_slotName = Window_EquipSlot.prototype.slotName;
    Window_EquipSlot.prototype.slotName = function (index) {
        return !FTKR.EES.disabledSlotName.contains(index + 1) ? _Window_EquipSlot_slotName.call(this, index) : '';
    };

    //=============================================================================
    // Window_EquipItem
    //=============================================================================

    Window_EquipItem.prototype.checkSameEquipIds = function (etypeId) {
        return matchEquipIds(etypeId, this._actor.equipSlots()[this._slotId]);
    };

    Window_EquipItem.prototype.checkEnabledMultiEquip = function (item) {
        return !FTKR.EES.enable && this._actor.isEquipped(item) && !enableMultipleEquipment(item);
    };

    Window_EquipItem.prototype.checkDisabledMultiEquip = function (item) {
        return FTKR.EES.enable && this._actor.isEquipped(item) && disableMultipleEquipment(item);
    };

    Window_EquipItem.prototype.checkEquippedSameWtypeIds = function (item) {
        return DataManager.isWeapon(item) && FTKR.EES.disabledWtpeIds.contains(item.wtypeId) && this._actor.isEquippedSameWtypeIds(item.wtypeId);
    };

    Window_EquipItem.prototype.checkEquippedSameAtypeIds = function (item) {
        return DataManager.isArmor(item) && FTKR.EES.disabledAtpeIds.contains(item.atypeId) && this._actor.isEquippedSameAtypeIds(item.atypeId);
    };

    //書き換え
    Window_EquipItem.prototype.includes = function (item) {
        if (item === null) {
            return true;
        }
        if (this._slotId < 0 || !this.checkSameEquipIds(item.etypeId)) {
            return false;
        }
        if (this.checkEnabledMultiEquip(item)) {
            return false;
        }
        if (this.checkDisabledMultiEquip(item)) {
            return false;
        }
        if (this.checkEquippedSameWtypeIds(item)) {
            return false;
        }
        if (this.checkEquippedSameAtypeIds(item)) {
            return false;
        }
        return this._actor.canEquip(item);
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================
    //書き換え
    Game_Actor.prototype.releaseUnequippableItems = function (forcing) {
        for (; ;) {
            var slots = this.equipSlots();
            var equips = this.equips();
            var changed = false;
            for (var i = 0; i < equips.length; i++) {
                var item = equips[i];
                if (item && (!this.canEquip(item) || !matchEquipIds(item.etypeId, slots[i]))) {
                    if (!forcing) {
                        this.tradeItemWithParty(null, item);
                    }
                    this._equips[i].setObject(null);
                    changed = true;
                }
            }
            if (!changed) {
                break;
            }
        }
    };

    //書き換え
    Game_Actor.prototype.bestEquipItem = function (slotId) {
        var etypeId = this.equipSlots()[slotId];
        var items = $gameParty.equipItems().filter(function (item) {
            return matchEquipIds(item.etypeId, etypeId) && this.canEquip(item);
        }, this);
        var bestItem = null;
        var bestPerformance = -1000;
        for (var i = 0; i < items.length; i++) {
            var performance = this.calcEquipItemPerformance(items[i]);
            if (performance > bestPerformance) {
                bestPerformance = performance;
                bestItem = items[i];
            }
        }
        return bestItem;
    };

    //書き換え
    Game_Actor.prototype.changeEquip = function (slotId, item) {
        if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
            (!item || matchEquipIds(item.etypeId, this.equipSlots()[slotId]))) {
            this._equips[slotId].setObject(item);
            this.refresh();
        }
    };

    Game_Actor.prototype.isEquippedSameWtypeIds = function (wtypeId) {
        return this.weapons().some(function (weapon) {
            return weapon && weapon.wtypeId === wtypeId;
        });
    };

    Game_Actor.prototype.isEquippedSameAtypeIds = function (atypeId) {
        return this.armors().some(function (armor) {
            return armor && armor.atypeId === atypeId;
        });
    };

}());//EOF