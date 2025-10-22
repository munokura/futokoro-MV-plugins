//=============================================================================
// ステート付与中に受けるダメージを固定化するプラグイン
// FTKR_DamageFixedStates.js
// プラグインNo : 74
// 作成者     : フトコロ
// 作成日     : 2018/04/03
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_DFS = true;

var FTKR = FTKR || {};
FTKR.DFS = FTKR.DFS || {};

//=============================================================================
/*:
@plugindesc v1.0.0 Plugin that fixes damage received while state is applied
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
By entering the following tags in the Note field of a state, you can fix the damage taken by a character with that state.

<DFS_HpDamage: x>
: HP damage taken is fixed to x.
: x can be replaced with a script, similar to a damage calculation formula.

<DFS_MpDamage: x>
: MP damage taken is fixed to x.
: x can be replaced with a script, similar to a damage calculation formula.

The following codes can be used in the damage portion:
a.param - References the parameters of the character receiving the state.
b.param - References the parameters of the character dealing the damage (attacking character).
s[x] - References the state of switch ID x.
v[x] - References the value of variable ID x.

Example:
<DFS_HpDamage: 1>
Any character affected by this state will receive 1 HP damage.

<DFS_HpDamage: a.hp>
Any character affected by this state will receive HP damage equal to their current HP.
In other words, they will die.

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

-----------------------------------------------------------------------------
License for this Plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin source
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.0.0 - April 3, 2018: First version created

-----------------------------------------------------------------------------
*/


/*:ja
@plugindesc v1.0.0 ステート付与中に受けるダメージを固定化するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
ステートのメモ欄に以下のタグを記入すると、そのステートを付与されている
キャラが受けるダメージを固定にできます。

<DFS_HPダメージ: x>
<DFS_HpDamage: x>
   : 受けるHPダメージが x に固定されます。
   : x にはダメージ計算式のようにスクリプトを入力できます。


<DFS_MPダメージ: x>
<DFS_MpDamage: x>
   : 受けるMPダメージが x に固定されます。
   : x にはダメージ計算式のようにスクリプトを入力できます。


ダメージ部分には、以下のコードを使用できます。
 a.param    - ステートを受けているキャラのパラメータを参照します。
 b.param    - ダメージを与える(攻撃側)のキャラのパラメータを参照します。
 s[x]       - スイッチID x の状態を参照します。
 v[x]       - 変数ID x の値を参照します。


設定例）
<DFS_HPダメージ: 1>
<DFS_HpDamage: 1>
このステートを受けているキャラは、受けるHPダメージがすべて１になります。

<DFS_HPダメージ: a.hp>
<DFS_HpDamage: a.hp>
このステートを受けているキャラは、そのキャラの現在HPと同じHPダメージを受けます。
つまり、死にます。


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

v1.0.0 - 2018/04/03 : 初版作成

-----------------------------------------------------------------------------
*/

//=============================================================================

(function () {

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
    // DataManager
    //=============================================================================

    var _DFS_DatabaseLoaded = false;
    var _DFS_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!_DFS_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_DFS_DatabaseLoaded) {
            this.dfsStateNoteTags($dataStates);
        }
        return true;
    };

    DataManager.dfsStateNoteTags = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            obj.dfs = {
                hp: readObjectMeta(obj, ['DFS_HpDamage', 'DFS_HPダメージ']),
                mp: readObjectMeta(obj, ['DFS_MpDamage', 'DFS_MPダメージ']),
            }
        }
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    Game_BattlerBase.prototype.isDfsStateAffected = function (type) {
        var value = '';
        var nonpopup = false;
        this._states.some(function (stateId) {
            if (stateId) {
                value = $dataStates[stateId].dfs[type];
                return value;
            }
        }, this);
        return value ? FTKR.evalFormula(value) : 0;
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    var _DFS_Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function (target, value) {
        FTKR.setGameData(target, this.subject(), this.item(), value);
        var newValue = target.isDfsStateAffected('hp');
        if (newValue) value = newValue;
        _DFS_Game_Action_executeHpDamage.call(this, target, value);
    };

    var _DFS_Game_Action_executeMpDamage = Game_Action.prototype.executeMpDamage;
    Game_Action.prototype.executeMpDamage = function (target, value) {
        FTKR.setGameData(target, this.subject(), this.item(), value);
        var newValue = target.isDfsStateAffected('mp');
        if (newValue) value = newValue;
        _DFS_Game_Action_executeMpDamage.call(this, target, value);
    };

}());//EOF