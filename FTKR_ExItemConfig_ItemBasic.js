//=============================================================================
// アイテムやスキルの基本設定を拡張するプラグイン
// FTKR_ExItemConfig_ItemBasic.js
// プラグインNo : 17
// 作成者     : フトコロ
// 作成日     : 2017/04/14
// 最終更新日 : 2018/04/16
// バージョン : v1.1.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_IEP = true;

var FTKR = FTKR || {};
FTKR.IEP = FTKR.IEP || {};

//=============================================================================
/*:
@plugindesc v1.1.2 Plugin that expands the basic settings of items and skills
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
Implementing this plugin adds the following Traits to items (including weapons and armor) and skills.

1. You can register multiple settings (name, icon, description) in advance and change their display conditionally in-game.

2. For items, weapons, and armor, you can also set their price.

3. For items and skills, you can also set their usable time.

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. When using this plugin in conjunction with FTKR_ItemSelfVariables.js, make sure to add this plugin below FTKR_ItemSelfVariables.js.

3. This plugin cannot be used in conjunction with FTKR_SkillExpansion.js.

-----------------------------------------------------------------------------
Changing Basic Settings
-----------------------------------------------------------------------------
By adding the following notetags to items (including weapons and armor) or skills,
you can register multiple basic settings for a single item or skill.

The settings in the database are registered with data ID 0.
Data ID 0 is applied if the validity conditions for other IDs are not met.

**************************************************************************
Note: When adding data IDs, be sure to add them in order, starting with ID 1.

**************************************************************************

<EIC Basic: x>
code
</EIC Basic>
: Registers the code section settings for data ID x.

[Items that can be set in the code section]
Validity condition: Formula
enabled: eval
: Sets the validity condition for data ID x using a formula (eval).
: If multiple IDs have the same validity condition, the one with the higher ID will be applied.
: If no validity condition is set, it will always be valid.

The following code will apply the database setting if not set.
name: ITEMNAME
: Changes the item/skill name to 'ITEMNAME'.

icon: y
: Changes the icon ID to y.

desc: DESCRIPTION
: Changes the item description to 'DESCRIPTION'.
: Control characters are allowed.
: By setting two, the description can be displayed on two lines.

<For Items, Weapons, and Armor>
price: eval
: Changes the item price to the value set by Formula (eval).

<For Items and Skills>
used: CONDITION
: Changes the usable setting to 'CONDITION'.
Enter the following letters or numbers for 'CONDITION':
: Always (0), Battle Screen (1), Menu Screen (2), Never (3)

[About the eval Value]
Like damage calculation formulas, eval allows you to use values other than fixed values by entering a formula. The following codes can be used:
a.param - References the actor's parameter (skills only).
s[x] - References the state of switch ID x.
v[x] - References the value of variable ID x.
iv[x] - References the value of item's self variable ID x. (*1)

(*1) FTKR_ItemSelfVariables.js is required to use self variables.

Input Example)
Settings for changing an item's settings when the item's self variable ID1 is 0.
Create an appraisal event, etc., and change the item's self variable ID1 to a value other than 0
to display the item as it should.

<EIC Basic: 1>
enabled: !iv[1]
name: Some Item
icon: 160
desc: An item whose use is unknown.
desc: Cannot be used until identified.
used: Never
</EIC Basic>

-----------------------------------------------------------------------------
License of this Plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017, 2018 Futokoro
http://opensource.org/licenses/mit-license.php

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.1.2 - 2018/04/16: Specification Changes
1. Function names have been changed to avoid conflicts with other plugins.

v1.1.1 - March 9, 2018: Bug fixes
1. Corrected the description of how to reference actor parameters in the formula description in the Help.
2. Fixed an issue where actor parameters were not Reflectioned in the description field when set as a condition.

v1.1.0 - April 29, 2017: Added Traits
1. Changed to apply to skills as well.
2. Added support for FTKR_ItemSelfVariables v1.1.0 and later.

v1.0.0 - April 14, 2017: Initial version created

-----------------------------------------------------------------------------
*/

/*:ja
@plugindesc v1.1.2 アイテムやスキルの基本設定を拡張するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、アイテム(武器・防具含む)やスキルに、
以下の仕様を追加します。

1. 事前に複数の設定(名前、アイコン、説明文)を登録し、
   ゲーム内で条件付けで表示を変えることができます。

2. アイテム・武器・防具の場合、価格も設定できます。

3. アイテム・スキルの場合、使用可能時も設定できます。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. FTKR_ItemSelfVariables.js と併用する場合は、本プラグインは、
   FTKR_ItemSelfVariables.jsよりも下の位置になるように追加してください。

3. 本プラグインは、FTKR_SkillExpansion.jsと組み合わせて使用できません。


-----------------------------------------------------------------------------
基本設定の変更
-----------------------------------------------------------------------------
アイテム(武器・防具含む)やスキルに以下のノートタグを追記することで、
一つのアイテム・スキルに対して複数の基本設定を登録することができます。

データベース上の設定は、データID0 に登録されます。
データID0は、他のIDの有効条件が満たない場合に適用します。

**********************************************************************
注意：データIDを追加する場合は、必ずID1 から順番に追加してください。
**********************************************************************

<EIC 基本設定: x>
code
</EIC 基本設定>

または

<EIC Basic: x>
code
</EIC Basic>
   :データID x に対して code部の設定を登録します。

[code部で設定できる項目]
有効条件: 計算式
enabled: eval
   :データID x の有効条件を 計算式(eval) で設定します。
   :有効条件が複数のIDで重なった場合は、IDが大きい方を適用します。
   :有効条件を設定しない場合、常に有効になります。

以下のcodeは、設定しなかった場合、データベース上の設定を適用します。
名前: アイテム名
name: ITEMNAME
   :アイテム・スキルの名前を'アイテム名(ITEMNAME)'に変更します。

アイコン: y
icon: y
   :アイコンIDを y に変更します。

説明: 説明文
desc: DESCRIPTION
   :アイテムの説明を'説明文(DESCRIPTION)'に変更します。
   :制御文字を使用できます。
   :二つ設定することで、説明文を2行に表示できます。

<アイテム・武器・防具用>
価格: 計算式
price: eval
   :アイテムの価格を 計算式(eval) で設定した値に変更します。

<アイテム・スキル用>
使用可能時: 状況
used: CONDITION
   :使用可能時の設定を'状況'に変更します。
   :'状況(CONDITION)'には以下の文字または数字を入力します。
   : 常時(0), バトル画面(1), メニュー画面(2), 使用不可(3)


[計算式(eval) の値について]
計算式(eval)は、ダメージ計算式のように、計算式を入力することで、
固定値以外の値を使用することができます。以下のコードを使用できます。
 a.param    - アクターのパラメータを参照します(スキルの場合のみ)。
 s[x]       - スイッチID x の状態を参照します。
 v[x]       - 変数ID x の値を参照します。
 iv[x]      - アイテムのセルフ変数ID x の値を参照します。(*1)

(*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。


入力例）
アイテムのセルフ変数ID1 が O の時にアイテムの設定を変える場合の設定。
鑑定イベント等を作成し、アイテムのセルフ変数ID1を 0 以外に変えると
アイテム本来の表示になります。

<EIC 基本設定: 1>
有効条件: !iv[1]
名前: 何かのアイテム
アイコン: 160
説明: 何に使えるか不明なアイテム。
説明: 鑑定するまで使用できない。
使用可能時: 使用不可
</EIC 基本設定>


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.1.2 - 2018/04/16 : 仕様変更
   1. 他プラグインとの競合回避のため、関数名を変更。

v1.1.1 - 2018/03/09 : 不具合修正
   1. ヘルプの計算式の説明で、アクターのパラメータ参照方法の記述を修正。
   2. アクターのパラメータを条件に設定しても説明欄に反映されない不具合を修正。

v1.1.0 - 2017/04/29 : 機能追加
   1. スキルにも適用できるように変更。
   2. FTKR_ItemSelfVariables の v1.1.0以降に対応。

v1.0.0 - 2017/04/14 : 初版作成

-----------------------------------------------------------------------------
*/

//=============================================================================

(function () {
    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    FTKR.IEP.parameters = PluginManager.parameters('FTKR_ExItemConfig_ItemBasic');

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
    // 自作関数(ローカル)
    //=============================================================================

    var readEntrapmentCodeToTextEx = function (obj, codeTitles) {
        regs = convertEntrapmentRegArrayEx('EIC ', codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var results = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (matchRegs(line, regs, 'start')) {
                //                console.log(regs);
                var data = {
                    id: RegExp.$1,
                    text: ''
                };
                setMode = 'read';
            } else if (matchRegs(line, regs, 'end')) {
                setMode = 'none';
                results.push(data);
            } else if (setMode === 'read') {
                //                console.log(line);
                data.text += line + ';';
            }
        }
        return results;
    };

    var convertTextToReg = function (text, header, footer) {
        header = header || '';
        footer = footer || '';
        return new RegExp(header + text + ':[ ]*(.+)' + footer, 'i');
    };

    var convertRegs = function (metacodes) {
        return metacodes.map(function (metacode) {
            return convertTextToReg(metacode);
        });
    };

    var convertEntrapmentRegArrayEx = function (header, codeTitles) {
        return codeTitles.map(function (codeTitle) {
            return {
                start: new RegExp('<' + header + codeTitle + ':[ ]*(.+)>', 'i'),
                end: new RegExp('<\/' + header + codeTitle + '>', 'i')
            };
        });
    };

    var matchRegs = function (data, regs, prop) {
        return regs.some(function (reg) {
            return prop ? data.match(reg[prop]) : data.match(reg);
        });
    };

    var matchTexts = function (data, texts, prop) {
        return convertRegs(texts).some(function (reg) {
            return prop ? data.match(reg[prop]) : data.match(reg);
        });
    };

    //=============================================================================
    // メタデータの読み取り
    //=============================================================================

    var _IEP_DatabaseLoaded = false;
    var _IEP_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!_IEP_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_IEP_DatabaseLoaded) {
            this.iepDataNotetags($dataItems);
            this.iepDataNotetags($dataWeapons);
            this.iepDataNotetags($dataArmors);
            this.iepDataNotetags($dataSkills);
            _IEP_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.iepDataNotetags = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.iepDatas = [];
            this.setIepData(obj);
            var datas = readEntrapmentCodeToTextEx(obj, ['基本設定', 'BASIC']);
            //           if (datas.length) console.log(datas);
            this.readIepMetaDatas(obj, datas);
        }
    };

    DataManager.setIepData = function (obj, dataId) {
        dataId = dataId || 0;
        if (!obj.iepDatas[dataId]) obj.iepDatas[dataId] = {};
        obj.iepDatas[dataId] = {
            name: obj.name,
            iconIndex: obj.iconIndex,
            description: obj.description,
            enabled: true,
        };
        if (obj.hasOwnProperty('price')) {
            obj.iepDatas[dataId].price = obj.price;
        }
        if (obj.hasOwnProperty('occasion')) {
            obj.iepDatas[dataId].occasion = obj.occasion;
        }
    };

    DataManager.readIepMetaDatas = function (obj, metaDatas) {
        for (var t = 0; t < metaDatas.length; t++) {
            var dataId = Number(metaDatas[t].id);
            var datas = metaDatas[t].text.split(';');
            this.setIepData(obj, dataId);
            var desc = '';

            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (matchTexts(data, ['有効条件', 'ENABLED'])) {
                    obj.iepDatas[dataId].enabled = RegExp.$1;
                } else if (matchTexts(data, ['名前', 'NAME'])) {
                    obj.iepDatas[dataId].name = RegExp.$1;
                } else if (matchTexts(data, ['アイコン', 'ICON'])) {
                    obj.iepDatas[dataId].iconIndex = Number(RegExp.$1);
                } else if (obj.hasOwnProperty('price') &&
                    matchTexts(data, ['価格', 'PRICE'])
                ) {
                    obj.iepDatas[dataId].price = RegExp.$1;
                } else if (obj.hasOwnProperty('occasion') &&
                    matchTexts(data, ['使用可能時', 'USED'])
                ) {
                    obj.iepDatas[dataId].occasion = this.occasion(RegExp.$1);
                } else if (matchTexts(data, ['説明', 'DESC'])) {
                    desc += RegExp.$1 + '\r\n';
                }
            }
            if (desc) obj.iepDatas[dataId].description = desc;
        }
    };

    DataManager.occasion = function (value) {
        switch (value) {
            case '常時':
            case '0':
                return 0;
            case 'バトル画面':
            case '1':
                return 1;
            case 'メニュー画面':
            case '2':
                return 2;
            case '使用不可':
            case '3':
            default:
                return 3;
        }
    };

    //=============================================================================
    // アイテムデータの取得
    //=============================================================================

    DataManager.evalEnabledFormula = function (formula) {
        if (!formula) return true;
        return FTKR.evalFormula(formula);
    };

    DataManager.itemIepData = function (item, subject, target) {
        FTKR.setGameData(subject, target, item);
        var iepDatas = item.iepDatas.filter(function (data) {
            return this.evalEnabledFormula(data.enabled);
        }, this);
        return iepDatas.pop();
    };

    DataManager.itemIepPrice = function (item) {
        FTKR.setGameData(null, null, item);
        return Number(this.evalEnabledFormula(this.itemIepData(item).price));
    };

    Window_Base.prototype.itemIepData = function (item) {
        var actor = this._actor ? this._actor : null;
        return DataManager.itemIepData(item, actor);
    };

    Window_Base.prototype.ftItemName = function (item) {
        return !!item ? this.itemIepData(item).name : '';
    };

    Window_Base.prototype.ftItemIcon = function (item) {
        return !!item ? this.itemIepData(item).iconIndex : 0;
    };

    Window_Base.prototype.ftItemDesc = function (item) {
        return !!item ? this.itemIepData(item).description : '';
    };

    //=============================================================================
    // アイテムの使用可能時の修正
    //=============================================================================

    var _IEP_Game_BattlerBase_isOccasionOk = Game_BattlerBase.prototype.isOccasionOk;
    Game_BattlerBase.prototype.isOccasionOk = function (item) {
        if (item.iepDatas) {
            var iepItem = DataManager.itemIepData(item, this);
            if ($gameParty.inBattle()) {
                return iepItem.occasion === 0 || iepItem.occasion === 1;
            } else {
                return iepItem.occasion === 0 || iepItem.occasion === 2;
            }
        } else {
            return _IEP_Game_BattlerBase_isOccasionOk.call(this, item);
        }
    };

    //=============================================================================
    // アイテムの名前・アイコン表示の修正
    //=============================================================================

    var _IEP_Window_Base_drawItemName = Window_Base.prototype.drawItemName;
    Window_Base.prototype.drawItemName = function (item, x, y, width) {
        width = width || 312;
        if (item && item.iepDatas) {
            var iw = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(this.ftItemIcon(item), x + 2, y + 2);
            this.drawText(this.ftItemName(item), x + iw, y, width - iw);
        } else {
            _IEP_Window_Base_drawItemName.call(this, item, x, y, width);
        }
    };

    //=============================================================================
    // アイテムの価格の修正
    //=============================================================================

    Window_Base.prototype.itemIepPrice = function (item) {
        return DataManager.itemIepPrice(item);
    };

    //書き換え
    Window_ShopBuy.prototype.makeItemList = function () {
        this._data = [];
        this._price = [];
        this._shopGoods.forEach(function (goods) {
            var item = null;
            switch (goods[0]) {
                case 0:
                    item = $dataItems[goods[1]]; break;
                case 1:
                    item = $dataWeapons[goods[1]]; break;
                case 2:
                    item = $dataArmors[goods[1]]; break;
            }
            if (item) {
                this._data.push(item);
                this._price.push(goods[2] === 0 ? this.itemIepPrice(item) : goods[3]);
            }
        }, this);
    };

    //書き換え
    Window_ShopSell.prototype.isEnabled = function (item) {
        return item && this.itemIepPrice(item) > 0;
    };

    //書き換え
    Scene_Shop.prototype.sellingPrice = function () {
        return Math.floor(DataManager.itemIepPrice(this._item) / 2);
    };

    //=============================================================================
    // アイテムの説明表示の修正
    //=============================================================================

    var _IEP_Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
    Scene_Skill.prototype.refreshActor = function () {
        _IEP_Scene_Skill_refreshActor.call(this);
        this._helpWindow.setActor(this.actor());
    };

    var _IEP_Window_Help_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function (item) {
        if (item && item.iepDatas) {
            this.setText(this.ftItemDesc(item));
        } else {
            _IEP_Window_Help_setItem.call(this, item);
        }
    };

    Window_Help.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

})();