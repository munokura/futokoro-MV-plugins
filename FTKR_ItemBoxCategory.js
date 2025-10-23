//=============================================================================
// アイテムボックスのカテゴリーを追加変更するプラグイン
// FTKR_ItemBoxCategory.js
// プラグインNo : 50
// 作成者     : フトコロ
// 作成日     : 2017/07/01
// 最終更新日 : 2017/12/10
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_IBCt = true;

var FTKR = FTKR || {};
FTKR.IBCt = FTKR.IBCt || {};
/*:
@plugindesc v1.1.0 Add and change item box categories
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
Implementing this plugin changes the item box category.

Online Manual
https://github.com/futokoro/RPGMaker/blob/master/FTKR_ItemBoxCategory.ja.md

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. This plugin cannot be used in conjunction with FTKR_ItemCategoryFixed.js.

----------------------------------------------------------------------------
Changing Item Categories
----------------------------------------------------------------------------
Changes the display of item categories on the item screen and shop screen.

1. Changing Item Category Display
You can change the display of item categories depending on the settings you make for the plugin parameter <Items Category>.

The input information is as follows:
item - Displays "Items"
weapon - Displays "Weapons"
armor - Displays "Armors"
keyItem - Displays "Key Item"
all - Displays the display name set in the plugin parameter <Category All Name>
Displays all items, weapons, armor, and Key Item in the item box
any character - Displays any string you enter
Sets this string as a new category name (*1)

You can set multiple categories using a comma (,).
Item categories will be displayed in the order entered.

(*1) Adding a Category
By entering the following tag in the Note field of an item, weapon, or armor,
you can set the added category to the item, weapon, or armor.

<IBCt_CATEGORY: category_name>

-----------------------------------------------------------------------------
License for this plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin Publisher
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.1.0 - December 10, 2017: Added Traits
1. Added the ability to set the display name of "items" on the Item Screen separately from the menu screen.

v1.0.0 - July 1, 2017: First version created

-----------------------------------------------------------------------------

@param Items Category
@desc Categories to display in the item box. Separate them with a comma (,).
@default item, weapon, armor, keyItem

@param Category Item Name
@desc Display name of category 'item' Set if you want to change it from the menu screen display

@param Category All Name
@desc Display name for category 'all'
@default All
*/


/*:ja
@plugindesc v1.1.0 アイテムボックスのカテゴリーを追加変更する
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、アイテムボックスのカテゴリーを変更します。


オンラインマニュアル
https://github.com/futokoro/RPGMaker/blob/master/FTKR_ItemBoxCategory.ja.md

-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. このプラグインはFTKR_ItemCategoryFixed.jsと組み合わせて使用できません。


-----------------------------------------------------------------------------
アイテムカテゴリーの変更
-----------------------------------------------------------------------------
アイテム画面や、ショップ画面のアイテムカテゴリーの表示を変更します。

1. アイテムカテゴリーの表示を変える
プラグインパラメータ<Items Category>に設定した内容によって
アイテムカテゴリーの表示を変えることができます。

入力内容は以下。
  item      - 「アイテム」を表示
  weapon    - 「武器」を表示
  armor     - 「防具」を表示
  keyItem   - 「大事なもの」を表示
  all       - プラグインパラメータ<Category All Name>で設定した表示名を表示
              アイテムボックスにはアイテム・武器・防具・大事なものをすべて表示
  任意の文字 - 入力した任意の文字列を表示
              この文字列を新たなカテゴリー名(*1)として設定します

カンマ(,)を使って複数設定できます。
入力した順番にアイテムカテゴリーを表示します。


(*1)カテゴリーの追加
アイテムや武器・防具のメモ欄に以下のタグを記入することで
追加したカテゴリーをアイテム・武器・防具に設定することができます。

<IBCt_カテゴリー: カテゴリー名>
<IBCt_CATEGORY: category_name>


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php


プラグイン公開元
https://github.com/futokoro/RPGMaker/blob/master/README.md


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.1.0 - 2017/12/10 : 機能追加
   1. アイテム画面で表示する「アイテム」の表示名を、メニュー画面と別に
      設定する機能を追加

v1.0.0 - 2017/07/01 : 初版作成

-----------------------------------------------------------------------------

@param Items Category
@desc アイテムボックスで表示するカテゴリー カンマ(,)で分けること
@default item, weapon, armor, keyItem

@param Category Item Name
@desc カテゴリー'item'の表示名 メニュー画面の表示と変えたい場合に設定する

@param Category All Name
@desc カテゴリー'all'の表示名
@default すべて
*/

//=============================================================================

(function () {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ItemBoxCategory');

    FTKR.IBCt = {
        list: String(parameters['Items Category'] || ''),
        category: {
            all: String(parameters['Category All Name'] || 'すべて'),
            item: String(parameters['Category Item Name'] || ''),
        },
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

    //=============================================================================
    // DataManager
    // アイテムに詳細カテゴリーを設定する
    //=============================================================================

    var _IBCt_DatabaseLoaded = false;
    var _IBCt_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!_IBCt_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_IBCt_DatabaseLoaded) {
            this.itemCategoryNotetags($dataItems);
            this.itemCategoryNotetags($dataWeapons);
            this.itemCategoryNotetags($dataArmors);
            _IBCt_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.itemCategoryNotetags = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.category = readObjectMeta(obj, ['IBCt_カテゴリー', 'IBCt_CATEGORY']);
        }
    };

    TextManager.convertItemCategory = function (category) {
        switch (category) {
            case TextManager.item:
                return 'item';
            case TextManager.weapon:
                return 'weapon';
            case TextManager.armor:
                return 'armor';
            case TextManager.keyItem:
                return 'keyItem';
            case FTKR.IBCt.category.all:
                return 'all';
            default:
                return category;
        }
    };

    //=============================================================================
    //Window_Item
    // アイテムボックスのカテゴリーを変更する
    //=============================================================================

    //書き換え
    Window_ItemCategory.prototype.makeCommandList = function () {
        var lists = FTKR.IBCt.list.replace(/\s/g, '').split(',');
        for (var i = 0; i < lists.length; i++) {
            var command = FTKR.IBCt.category[lists[i]] || TextManager[lists[i]] || lists[i];
            this.addCommand(command, lists[i]);
        }
    };

    //書き換え
    Window_ItemList.prototype.includes = function (item) {
        switch (TextManager.convertItemCategory(this._category)) {
            case 'item':
                return DataManager.isItem(item) && item.itypeId === 1;
            case 'weapon':
                return DataManager.isWeapon(item);
            case 'armor':
                return DataManager.isArmor(item);
            case 'keyItem':
                return DataManager.isItem(item) && item.itypeId === 2;
            case 'all':
                return this.isAllItems(item);
            default:
                return item ? item.category === this._category : false;
        }
    };

    Window_ItemList.prototype.isAllItems = function (item) {
        return DataManager.isItem(item) ||
            DataManager.isWeapon(item) || DataManager.isArmor(item);
    }

}());//EOF