//=============================================================================
// アイテムボックスのカテゴリ選択を無くすプラグイン
// FTKR_ItemCategoryFixed.js
// プラグインNo : 42
// 作成者     : フトコロ
// 作成日     : 2017/06/01
// 最終更新日 : 2019/11/22
// バージョン : v1.0.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ICF = true;

var FTKR = FTKR || {};
FTKR.ICF = FTKR.ICF || {};
/*:
@plugindesc v1.0.3 Remove category selection from item box
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
Implementing this plugin will eliminate the category selection in the item box.

The category window will not be displayed.

The item categories displayed in the box are configured using the plugin parameters.

item - Show only items (excluding Key Item)
allitem - Show only items (including Key Item)
weapon - Show only weapons
armor - Show only armors
key - Show only Key Item
all - Show all items, weapons, and armors

-----------------------------------------------------------------------------
Setup
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

---------------------------------------------------------------------------
License for this plugin
---------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017-2019 Futokoro
http://opensource.org/licenses/mit-license.php

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.0.3 - 2019/10/25: Bug Fixes (Proposed by YouChalic)
Fixed an issue where hidden items were displayed when selecting "item" or "all."
Added categories and some changes.
"itemall" displays items and Key Item.
Added "key" to display only Key Item.
Changed "item" to exclude Key Item.

v1.0.2 - 2019/04/16: Bug Fixes
Fixed an issue where the help window text was not displayed when the item screen was opened.

v1.0.1 - June 2, 2017: Added support for shop sales.
v1.0.0 - June 1, 2017: Initial version created.

-----------------------------------------------------------------------------

@param Item Category
@desc Categories to display in the item box
@default all
@type select
@option Items only (Key Item not included)
@value item
@option Items only (including Key Item)
@value allitem
@option Weapons only
@value weapon
@option Armors only
@value armor
@option Only the important things
@value key
@option all
@value all
*/


/*:ja
@plugindesc v1.0.3 アイテムボックスのカテゴリ選択を無くす
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、アイテムボックスのカテゴリー選択をなくします。
また、カテゴリーウィンドウを表示しません。

ボックス内に表示するアイテムのカテゴリーはプラグインパラメータで設定します。
  item    　- アイテムのみ表示(大事なものは含まない)
  allitem   - アイテムのみ表示(大事なもの含む)
  weapon 　 - 武器のみ表示
  armor   　- 防具のみ表示
  key  　　 - 大事なもののみ表示
  all    　 - アイテム・武器・防具をすべて表示


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

Copyright (c) 2017-2019 Futokoro
http://opensource.org/licenses/mit-license.php


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.0.3 - 2019/10/25 : 不具合修正 (YouChalicさん案)
 「item」「all」を選択時に隠しアイテムが表示されてしまう不具合を修正。
  カテゴリ追加、一部変更
  アイテムと大事なものを表示する「itemall」
  大事なもののみ表示する「key」を追加。
 「item」を大事なものを含めない仕様に変更。

v1.0.2 - 2019/04/16 : 不具合修正
 アイテム画面を開いた時にヘルプウィンドウ内の文章が表示されない不具合を修正。

v1.0.1 - 2017/06/02 : ショップの売却シーンに対応
v1.0.0 - 2017/06/01 : 初版作成

-----------------------------------------------------------------------------

@param Item Category
@desc アイテムボックスで表示するカテゴリー
@default all
@type select
@option アイテムのみ(大事なもの含まず)
@value item
@option アイテムのみ(大事なもの含む)
@value allitem
@option 武器のみ
@value weapon
@option 防具のみ
@value armor
@option 大事なもののみ
@value key
@option すべて
@value all
*/

//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ICF.parameters = PluginManager.parameters('FTKR_ItemCategoryFixed');

FTKR.ICF.category = String(FTKR.ICF.parameters['Item Category'] || '');

//=============================================================================
//Window_ItemList
// アイテムウィンドウに表示するアイテムのカテゴリーをプラグインパラメータで指定する
//=============================================================================

//書き換え
Window_ItemList.prototype.includes = function (item) {
    switch (FTKR.ICF.category) {
        case 'item':
            return DataManager.isItem(item) && item.itypeId === 1;
        case 'allitem':
            return DataManager.isItem(item) && (item.itypeId === 1 || item.itypeId === 2);
        case 'weapon':
            return DataManager.isWeapon(item);
        case 'armor':
            return DataManager.isArmor(item);
        case 'key':
            return DataManager.isItem(item) && item.itypeId === 2;
        case 'all':
            return this.isAllItems(item);
    }
};

Window_ItemList.prototype.isAllItems = function (item) {
    return DataManager.isItem(item) && (item.itypeId === 1 || item.itypeId === 2) ||
        DataManager.isWeapon(item) || DataManager.isArmor(item);
};

//=============================================================================
//Scene_Item
// 直接アイテムリストを選択できるようにする
//=============================================================================

var _ICF_SceneItem_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function () {
    _ICF_SceneItem_createItemWindow.call(this);
    //アイテムウィンドウのサイズ調整
    this._itemWindow.y = this._helpWindow.height;
    this._itemWindow.height = Graphics.boxHeight - this._itemWindow.y;
    //カテゴリウィンドウを消して、アイテムウィンドウにカーソルを移す
    this.hideSubWindow(this._categoryWindow);
    this._itemWindow.selectLast();
};

//アイテムウィンドウでキャンセルするとメニュー画面に戻る
Scene_Item.prototype.onItemCancel = function () {
    this._itemWindow.deselect();
    this.popScene();
};

//=============================================================================
//Scene_Shop
// 直接アイテムリストを選択できるようにする
//=============================================================================

var _ICF_SceneShop_createSellWindow = Scene_Shop.prototype.createSellWindow;
Scene_Shop.prototype.createSellWindow = function () {
    _ICF_SceneShop_createSellWindow.call(this);
    //アイテムウィンドウのサイズ調整
    this._sellWindow.y = this._dummyWindow.y;
    this._sellWindow.height = Graphics.boxHeight - this._sellWindow.y;
};

//書き換え
Scene_Shop.prototype.activateSellWindow = function () {
    this._sellWindow.refresh();
    this._sellWindow.show();
    this._sellWindow.activate();
    this._statusWindow.hide();
};

//書き換え
Scene_Shop.prototype.commandSell = function () {
    this.activateSellWindow();
    this._sellWindow.select(0);
};

//書き換え
Scene_Shop.prototype.onSellCancel = function () {
    this._sellWindow.deselect();
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
    this._commandWindow.activate();
    this._dummyWindow.show();
    this._sellWindow.hide();
    this.hideItemstatusWindows();
    this.clearItemstatusWindows();
};