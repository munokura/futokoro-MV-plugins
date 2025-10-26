//=============================================================================
// アイテムとスキルの発動設定を拡張するプラグイン
// FTKR_ExItemConfig_Activate.js
// プラグインNo : 20
// 作成者     : フトコロ
// 作成日     : 2017/04/14
// 最終更新日 : 2017/06/23
// バージョン : v1.0.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EIA = true;

var FTKR = FTKR || {};
FTKR.EIA = FTKR.EIA || {};

//=============================================================================
/*:
@plugindesc v1.0.2 A plugin that expands item and skill activation settings
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
By implementing this plugin, you can configure the activation settings of items and skills in more detail.

1. You can set the number of consecutive hits using a JavaScript formula.

2. You can set the success rate using a JavaScript formula.

3. You can change the calculation process for success checks, hit checks, and evasion checks.

4. You can set the hit rate for each item/skill using a JavaScript formula.

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. This plugin cannot be used in conjunction with FTKR_SkillExpansion.js.

-----------------------------------------------------------------------------
Setting the Number of Consecutive Hits
-----------------------------------------------------------------------------
You can set the number of consecutive hits by adding the following note tag to an item or skill.

<EIC ACTIVATE>
code
</EIC ACTIVATE>

[Items that can be used in code]
Count: eval
Continuous Count: Formula
: Changes the continuous count to the value of the formula (eval).

Success Rate: eval
Success Rate: Formula
: Changes the success rate to the value of the formula (eval).

Hit Rate: eval
Accuracy Rate: Formula
: Regardless of the plugin parameter settings
: Changes the accuracy rate to the value of the formula (eval).

Eva Rate: eval
Evasion Rate: Formula
: Regardless of the plugin parameter settings
: Changes the Evasion rate to the value of the formula (eval).

[About the Formula (eval) Value]
Like the damage formula, you can use non-fixed values for the formula (eval) by entering a formula. The following codes can be used:
a.param - References the user's parameters. (a.atk is the user's attack power)
b.param - References the target's parameters.
s[x] - References the state of switch ID x.
v[x] - References the value of variable ID x.
iv[x] - References the value of item self variable ID x. (*1)
BattleManager._repeatCount - References the number of consecutive hits, with the first hit being 0. (*2)

(*1) FTKR_ItemSelfVariables.js is required to use self variables.
(*2) If this plugin is enabled, this code can be used in the calculation formula of another plugin.

Input example)
Use the skill five times in a row, with the success rate decreasing by 10% each time.
The first hit is 100%, the second is 90%, the third is 80%, etc.
Adds a +10% correction to the user's hit rate.
<EIC ACTIVATE>
Number of Repeats: 5
Success Rate: 1 - BattleManager._repeatCount * 0.1
Accuracy Rate: a.hit + 0.1
</EIC ACTIVATE>

-----------------------------------------------------------------------------
Regarding Activation Failures During Repeat Attacks
-----------------------------------------------------------------------------
You can change this setting using the following plugin parameters.

<Enabled Repeat Failure>
: If an item/skill fails, misses, or is Evasiond during a repeat attack,
: Sets whether to stop the attack at that point.
: 0 - Continue attacking, 1 - Stop attacking

---------------------------------------------------------------------------
Regarding Activation Failure Handling
--------------------------------------------------------------------------------------------
In MV's standard specifications, if an item/skill fails to activate (fails based on success rate),
it is treated as a missed hit.
Therefore, the battle log displays a message for missed hits.

This plugin allows you to determine success rate separately from hit rate, and to display separate failure messages.
This is configured using the following plugin parameters.

<Enabled Action Failure>
: Sets whether to use a special message when an action fails.
: 0 - Disable, 1 - Enable
: If enabled, the action will first be determined based on success rate alone.

<Action Failure Message>
: Sets a special message when an action fails.
: %1 is replaced with the user's name, and %2 is replaced with the item/skill name.

-----------------------------------------------------------------------------
About Hit and Evasion Processing
-----------------------------------------------------------------------------
In MV's standard specifications, item/skill hit and Evasion processing follows this flow:

1. Determine whether to hit by checking the user's hit rate and the item/skill's success rate.

2. If the hit check is successful, determine whether the target will Evasion by checking the target's Evasion rate.

For this reason, a hit rate of 100% or higher is meaningless, and if the target has an Evasion rate, they may Evasion even if their hit rate is 100%.

In contrast, this plugin allows you to change the hit and Evasion processing.
For example, you can change the process to subtract the target's evasion rate from the user's hit rate, or use parameters other than hit rate and evasion rate.

This is configured using the following plugin parameters.

<Enabled Custom Hit>
: Sets whether to change the hit calculation formula.
: Setting this to 1 enables the formula described below.
: Note that if a hit rate is set in the item/skill Note field,
: that value will be used regardless of the setting of this parameter.

<Physical Hit Formula>
<Magical Hit Formula>
: Sets the hit calculation formula.
: Sets the hit rate for physical-type attacks with Physical~, and the hit rate for magical-type attacks with Magical~.
: Sets the hit rate for magical-type attacks with 1.

<Enabled Custom Eva>
: Sets whether to change the evasion calculation formula.
: Sets the formula described below with 1.

<Physical Eva Formula>
<Magical Eva Formula>
: Sets the evasion formula.
: Sets the evasion rate for physical types with Physical~, and the evasion rate for magical types with Magic~.
: Sets evasion to 0 to disable evasion.

[About the Calculation Formula (eval) Value]
Like the damage formula, the Calculation Formula (eval) allows you to use non-fixed values by entering a formula.
The following codes can be used:
a.param - References the user's parameters. (a.atk is the user's attack power)
b.param - References the target's parameters.
s[x] - References the state of switch ID x.
v[x] - References the value of variable ID x.
iv[x] - References the value of item self variable ID x. (*1)
BattleManager._repeatCount - References the number of consecutive hits, with the first hit being 0.

(*1) FTKR_ItemSelfVariables.js is required to use self variables.

[Configuration Example]
1. Hit - Evasion
During the hit process, the hit - Evasion calculation is performed, and the Evasion process is ignored.
In this case, the Evasion message will not be displayed.
Hit Processing
<Enabled Custom Hit> : 1
<Physical Hit Formula> : a.hit - b.eva
<Magical Hit Formula> : 1 - b.mev
Evasion Processing
<Enabled Custom Eva> : 1
<Physical Eva Formula> : 0
<Magical Eva Formula> : 0

2. When the hit rate exceeds 100%, the amount is subtracted from the target's evasion.
Hit Processing (No Change)
<Enabled Custom Hit> : 0
Evasion Processing
<Enabled Custom Eva> : 1
<Physical Eva Formula> : b.eva - Math.max(a.hit - 1, 0)
<Magical Eva Formula> : b.mev

-----------------------------------------------------------------------------
License for this Plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php

----------------------------------------------------------------------------
Change History
----------------------------------------------------------------------------

v1.0.3 - 2017/06/23: Bug fixes
1. Fixed an error that occurred when obtaining evasion rate.

v1.0.2 - 2017/05/11: Bug fixes

v1.0.1 - 2017/04/29: Supports FTKR_ItemSelfVariables v1.1.0 and later

v1.0.0 - 2017/04/14: First version released

-----------------------------------------------------------------------------

@param Enabled Repeat Failure
@desc When attacking consecutively, if you fail midway, will the attack stop? 0 - Do not stop attacking, 1 - Stop attacking
@default 0

@param Console Display Result
@desc Whether to display the result of the trigger on the console screen. 0 - Do not display, 1 - Display
@default 0

@param -- 発動失敗処理 --
@text -- Activation failure processing --

@param Enabled Action Failure
@desc Use a special message when the activation fails. 0 - Do not use, 1 - Use
@default 0

@param Action Failure Message
@desc Special message when activation fails: %1 - The User's name, %2 - Item/skill name
@default %1は%2の発動に失敗した！

@param -- 命中処理 --
@text -- Hit Processing --

@param Enabled Custom Hit
@desc Change the hit calculation formula: 0 - Do not change, 1 - Change
@default 0

@param Physical Hit Formula
@desc Changed physical hit calculation formula: a - user, b - target
@default a.hit

@param Magical Hit Formula
@desc The modified magic hit formula is: a - user, b - target
@default 1

@param -- 回避処理 --
@text -- Avoidance process --

@param Enabled Custom Eva
@desc Change the avoidance formula: 0 - Do not change, 1 - Change
@default 0

@param Physical Eva Formula
@desc Changed physical evasion formula: a - user, b - target
@default b.eva

@param Magical Eva Formula
@desc The modified magic evasion formula is: a - user, b - target
@default b.mev
*/

/*:ja
@plugindesc v1.0.2 アイテムとスキルの発動設定を拡張するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、アイテムやスキルの発動設定を
より詳細に設定できます。

1. 連続回数をJS計算式で設定できます。

2. 成功率をJS計算式で設定できます。

3. 成功判定、命中判定、回避判定の計算処理を変更できます。

4. アイテム/スキル毎に命中率をJS計算式で設定できます。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. 本プラグインは、FTKR_SkillExpansion.jsと組み合わせて使用できません。


-----------------------------------------------------------------------------
連続回数の設定
-----------------------------------------------------------------------------
アイテムやスキルに以下のノートタグを追記することで、連続回数の設定ができます。

<EIC 発動設定>
code
</EIC 発動設定>


[code に使用できる項目]
Count: eval
連続回数: 計算式
   :連続回数を 計算式(eval) の値に変更します。

Success Rate: eval
成功率: 計算式
   :成功率を 計算式(eval) の値に変更します。

Hit Rate: eval
命中率: 計算式
   :プラグインパラメータの設定に関わらずに
   :命中率を計算式(eval) の値に変更します。

Eva Rate: eval
回避率: 計算式
   :プラグインパラメータの設定に関わらずに
   :回避率を計算式(eval) の値に変更します。


[計算式(eval) の値について]
計算式(eval)は、ダメージ計算式のように、計算式を入力することで、
固定値以外の値を使用することができます。以下のコードを使用できます。
 a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 b.param - 対象者のパラメータを参照します。
 s[x]    - スイッチID x の状態を参照します。
 v[x]    - 変数ID x の値を参照します。
 iv[x]   - アイテムのセルフ変数ID x の値を参照します。(*1)
 BattleManager._repeatCount - 1撃目を 0 として連続回数を参照します。(*2)

(*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。
(*2) 本プラグインが有効であれば、このコードを別のプラグインの
     計算式に使用できます。


入力例)
スキルを5回連続で使用するが、1回毎に成功率が10%ずつ下がる。
1回目が100%、2回目は90%、3回目は80%、...となる。
使用者の命中率に+10%の補正を加える。
<EIC 発動設定>
連続回数: 5
成功率: 1 - BattleManager._repeatCount * 0.1
命中率: a.hit + 0.1
</EIC 発動設定>


-----------------------------------------------------------------------------
連続攻撃中の発動失敗について
-----------------------------------------------------------------------------
以下のプラグインパラメータで設定を変更できます。

<Enabled Repeat Failure>
   :連続攻撃中にアイテム/スキルが失敗、命中しない、回避される等すると
   :その時点で攻撃をやめるかどうか設定できます。
   :0 - 攻撃を続けます, 1 - 攻撃をやめます


-----------------------------------------------------------------------------
発動失敗処理について
-----------------------------------------------------------------------------
MVの標準仕様では、アイテム/スキルの発動失敗(成功率の判定で失敗)した場合は
命中しなかった、という扱いになります。
そのため、バトルログは命中しない場合のメッセージを表示します。

本プラグインでは、成功率の判定を命中率とは別に行い、失敗時のメッセージも
別にすることができます。
以下のプラグインパラメータで設定します。

<Enabled Action Failure>
   :発動失敗時の専用メッセージを使用するか設定します。
   :0 - 使用しない, 1 - 使用する
   :使用するに設定した場合、まず成功率だけで判定を行います。

<Action Failure Message>
   :発動失敗時の専用メッセージを設定します。
   :%1 は使用者の名前, %2 はアイテム/スキルの名前に変更します。


-----------------------------------------------------------------------------
命中および回避処理について
-----------------------------------------------------------------------------
MVの標準仕様では、アイテム/スキルの命中と回避の処理は以下の流れになっています。

1. 使用者の命中率とアイテム/スキルの成功率を参照して命中するかどうか判定する。
2. 命中判定に成功した場合、対象の回避率を参照して対象が
   回避するかどうか判定する。

このため、命中率は100%以上は意味がなく、対象に回避率が有る場合は、
命中率が100%あっても回避される可能性があります。

これに対して、本プラグインでは、命中と回避の処理を変更することができます。
例えば、使用者の命中率から対象の回避率を引く、といった処理に変えることや
命中率と回避率以外のパラメータを使用することができるようになります。

以下のプラグインパラメータで設定します。

<Enabled Custom Hit>
   :命中の計算式を変更するか設定します。
   :1 にすることで後述の計算式が有効になります。
   :なお、アイテム/スキルのメモ欄で命中率の設定をしている場合は
   :このパラメータの設定に関わらず、その値を使用します。

<Physical Hit Formula>
<Magical Hit Formula>
   :命中の計算式を設定します。
   :Physical~ で物理タイプの命中率、Magical~ で魔法タイプの命中率を
   :設定します。
   :1 に設定すると、必ず命中します。

<Enabled Custom Eva>
   :回避の計算式を変更するか設定します。
   :1 にすることで後述の計算式が有効になります。

<Physical Eva Formula>
<Magical Eva Formula>
   :回避の計算式を設定します。
   :Physical~ で物理タイプの回避率、Magical~ で魔法タイプの回避率を
   :設定します。
   :0 に設定すると、回避されなくなります。


[計算式(eval) の値について]
計算式(eval)は、ダメージ計算式のように、計算式を入力することで、
固定値以外の値を使用することができます。以下のコードを使用できます。
 a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 b.param - 対象者のパラメータを参照します。
 s[x]    - スイッチID x の状態を参照します。
 v[x]    - 変数ID x の値を参照します。
 iv[x]   - アイテムのセルフ変数ID x の値を参照します。(*1)
 BattleManager._repeatCount - 1撃目を 0 として連続回数を参照します。

(*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。


[設定例]
1. 命中 - 回避にする場合
命中側の処理で、命中 - 回避の計算を行い、回避処理は無視する。
この場合は回避メッセージを表示することはありません。
命中処理
<Enabled Custom Hit>   : 1
<Physical Hit Formula> : a.hit - b.eva
<Magical Hit Formula>  : 1 - b.mev
回避処理
<Enabled Custom Eva>   : 1
<Physical Eva Formula> : 0
<Magical Eva Formula>  : 0

2. 命中率が 100%を超えた分を、対象の回避から減らす場合
命中処理(変更しない)
<Enabled Custom Hit>   : 0
回避処理
<Enabled Custom Eva>   : 1
<Physical Eva Formula> : b.eva - Math.max(a.hit - 1, 0)
<Magical Eva Formula>  : b.mev


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

v1.0.3 - 2017/06/23 : 不具合修正
   1. 回避率の取得処理でエラーが起きる不具合を修正。

v1.0.2 - 2017/05/11 : 不具合修正

v1.0.1 - 2017/04/29 : FTKR_ItemSelfVariables の v1.1.0以降に対応

v1.0.0 - 2017/04/14 : 初版公開

-----------------------------------------------------------------------------

@param Enabled Repeat Failure
@desc 連続攻撃時に途中で失敗すると攻撃をやめるか 0 - 攻撃をやめない, 1 - 攻撃をやめる
@default 0

@param Console Display Result
@desc 発動結果をコンソール画面に表示するか 0 - 表示しない, 1 - 表示する
@default 0

@param -- 発動失敗処理 --
@text -- 発動失敗処理 --

@param Enabled Action Failure
@desc 発動失敗時の専用メッセージを使用するか。 0 - 使用しない, 1 - 使用する
@default 0

@param Action Failure Message
@desc 発動失敗時の専用メッセージ %1 - 使用者の名前, %2 - アイテム/スキルの名前
@default %1は%2の発動に失敗した！

@param -- 命中処理 --
@text -- 命中処理 --

@param Enabled Custom Hit
@desc 命中の計算式を変更するか 0 - 変更しない, 1 - 変更する
@default 0

@param Physical Hit Formula
@desc 変更後の物理の命中計算式 a - 使用者, b - 対象者
@default a.hit

@param Magical Hit Formula
@desc 変更後の魔法の命中計算式 a - 使用者, b - 対象者
@default 1

@param -- 回避処理 --
@text -- 回避処理 --

@param Enabled Custom Eva
@desc 回避の計算式を変更するか 0 - 変更しない, 1 - 変更する
@default 0

@param Physical Eva Formula
@desc 変更後の物理の回避計算式 a - 使用者, b - 対象者
@default b.eva

@param Magical Eva Formula
@desc 変更後の魔法の回避計算式 a - 使用者, b - 対象者
@default b.mev
*/

//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EIA.parameters = PluginManager.parameters('FTKR_ExItemConfig_Activate');

FTKR.EIA.enabledRepeatFailure = Number(FTKR.EIA.parameters['Enabled Repeat Failure'] || 0);
FTKR.EIA.console = Number(FTKR.EIA.parameters['Console Display Result'] || 0);
FTKR.EIA.enabledActionFailure = Number(FTKR.EIA.parameters['Enabled Action Failure'] || 0);
FTKR.EIA.actionFailureMessage = String(FTKR.EIA.parameters['Action Failure Message'] || '');
FTKR.EIA.customHit = {
    enabled: Number(FTKR.EIA.parameters['Enabled Custom Hit'] || 0),
    pFormula: String(FTKR.EIA.parameters['Physical Hit Formula'] || ''),
    mFormula: String(FTKR.EIA.parameters['Magical Hit Formula'] || ''),
};
FTKR.EIA.customEva = {
    enabled: Number(FTKR.EIA.parameters['Enabled Custom Eva'] || 0),
    pFormula: String(FTKR.EIA.parameters['Physical Eva Formula'] || ''),
    mFormula: String(FTKR.EIA.parameters['Magical Eva Formula'] || ''),
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
// Number
//=============================================================================

Number.prototype._getDec = function () {
    var list = (this + '').split('.');
    return list[1] !== undefined && list[1].length > 0 ? list[1].length : 0;
};

// 少数で表現された数値をパーセント表示の数値に変換する (例:0.5 を 50 に変換)
Number.prototype.percent = function (dec) {
    dec = dec || 0;
    var decnum = this._getDec();
    var int = +(this + '').replace('.', '');
    var diffdec = 2 + dec - decnum;
    return Math.floor(int * Math.pow(10, diffdec)) / Math.pow(10, dec);
}

//=============================================================================
// DataManager
//=============================================================================

FTKR.EIA.DatabaseLoaded = false;
FTKR.EIA.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!FTKR.EIA.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!FTKR.EIA.DatabaseLoaded) {
        this.eicActivateNoteTags($dataSkills);
        this.eicActivateNoteTags($dataItems);
        FTKR.EIA.DatabaseLoaded = true;
    }
    return true;
};

DataManager.eicActivateNoteTags = function (group) {
    var note1a = /<(?:EIC 発動設定)>/i;
    var note1aj = /<(?:EIC ACTIVATE)>/i;
    var note1b = /<\/(?:EIC 発動設定)>/i;
    var note1bj = /<\/(?:EIC ACTIVATE)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        var setMode = 'none';
        obj.seprepeats = '';

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(note1a) || line.match(note1aj)) {
                var text = '';
                setMode = 'anydata';
            } else if (note1b.test(line) || note1bj.test(line)) {
                setMode = 'none';
                obj.seprepeats = text;
            } else if (setMode === 'anydata') {
                text += line + ';';
            }
        }
        this.makeEiaData(obj);
        obj.seprepeats = '';
    }
};

DataManager.makeEiaData = function (skill) {
    skill.sepRepeats = {
        count: skill.repeats + '',
        successRate: '',
        hitRate: '',
        evaRate: '',
    };
    this.setSepRepeats(skill);
};

DataManager.setSepRepeats = function (skill) {
    var sepdata = skill.seprepeats;
    if (sepdata) {
        var case1 = /(?:COUNT):[ ]*(.+)/i;
        var case1j = /(?:連続回数):[ ]*(.+)/i;
        var case2 = /(?:SUCCESS RATE):[ ]*(.+)/i;
        var case2j = /(?:成功率):[ ]*(.+)/i;
        var case3 = /(?:HIT RATE):[ ]*(.+)/i;
        var case3j = /(?:命中率):[ ]*(.+)/i;
        var case4 = /(?:EVA RATE):[ ]*(.+)/i;
        var case4j = /(?:回避率):[ ]*(.+)/i;

        var datas = sepdata.split(';');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.match(case1) || data.match(case1j)) {
                skill.sepRepeats.count = String(RegExp.$1);
            } else if (data.match(case2) || data.match(case2j)) {
                skill.sepRepeats.successRate = String(RegExp.$1);
            } else if (data.match(case3) || data.match(case3j)) {
                skill.sepRepeats.hitRate = String(RegExp.$1);
            } else if (data.match(case4) || data.match(case4j)) {
                skill.sepRepeats.evaRate = String(RegExp.$1);
            }
        }
    }
};

//=============================================================================
// BattleManager
//=============================================================================

FTKR.EIA.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function () {
    FTKR.EIA.BattleManager_initMembers.call(this);
    this._repeatCount = 0;
    this._repeatFailure = false;
};

FTKR.EIA.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function () {
    this._repeatCount = 0;
    this._repeatFailure = false;
    FTKR.EIA.BattleManager_startAction.call(this);
};

FTKR.EIA.BattleManager_updateAction = BattleManager.updateAction;
BattleManager.updateAction = function () {
    if (this._repeatFailure && FTKR.EIA.enabledRepeatFailure) {
        this.endAction();
    } else {
        FTKR.EIA.BattleManager_updateAction.call(this);
    }
};

FTKR.EIA.BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction = function (subject, target) {
    FTKR.EIA.BattleManager_invokeNormalAction.call(this, subject, target);
    this._repeatCount++;
};

//=============================================================================
// Game_Action
//=============================================================================

//書き換え
Game_Action.prototype.numRepeats = function () {
    FTKR.setGameData(this.subject(), null, this.item());
    var repeats = this.item().sepRepeats ?
        FTKR.evalFormula(this.item().sepRepeats.count) :
        this.item().repeats;
    if (this.isAttack()) repeats += this.subject().attackTimesAdd();
    return Math.floor(repeats);
};

FTKR.EIA.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function (target) {
    if (FTKR.EIA.console) {
        this.consoleApply(target);
    } else {
        if (FTKR.EIA.enabledActionFailure) {
            if (this.isActionFailure(target)) return;
        }
        FTKR.EIA.Game_Action_apply.call(this, target);
    }
};
Game_Action.prototype.consoleApply = function (target) {
    console.log(this.item().name, '発動結果', '使用者:', this.subject().name(), '対象:', target.name());
    var result = target.result();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
    result.item = this.item();
    var rand = Math.random();
    var success = this.itemSuccess(target);
    result.actionFailure = (result.used && rand >= success);
    console.log('成功判定:', !result.actionFailure, '＝', '成功率:', success.percent(), '＞', 'ランダム値:', rand.percent());
    if (!result.isActionFailure()) {
        var rand1 = Math.random();
        var hit = this.itemHit(target);
        result.missed = (result.used && rand1 >= hit);
        console.log('命中判定:', !result.missed, '＝', '命中率:', hit.percent(), '＞', 'ランダム値:', rand1.percent());
        var rand2 = Math.random();
        var eva = this.itemEva(target);
        result.evaded = (!result.missed && rand2 < eva);
        console.log('回避判定:', result.evaded, '＝', '回避率:', eva.percent(), '＞', 'ランダム値:', rand2.percent());
        result.physical = this.isPhysical();
        result.drain = this.isDrain();
        if (result.isHit()) {
            console.log('命中成功！');
            if (this.item().damage.type > 0) {
                result.critical = (Math.random() < this.itemCri(target));
                var value = this.makeDamageValue(target, result.critical);
                this.executeDamage(target, value);
            }
            this.item().effects.forEach(function (effect) {
                this.applyItemEffect(target, effect);
            }, this);
            this.applyItemUserEffect(target);
        } else {
            console.log('命中失敗！');
        }
    } else {
        console.log('発動失敗！');
    }
};

Game_Action.prototype.isActionFailure = function (target) {
    var result = target.result();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
    result.item = this.item();
    result.actionFailure = (result.used && Math.random() >= this.itemSuccess(target));
    return result.isActionFailure();
};

Game_Action.prototype.itemSuccess = function (target) {
    FTKR.setGameData(this.subject(), target, this.item());
    var repeats = this.item().sepRepeats;
    var result = repeats && repeats.successRate ?
        FTKR.evalFormula(repeats.successRate) :
        this.item().successRate * 0.01;
    return result;
};

//書き換え
Game_Action.prototype.itemHit = function (target) {
    if (FTKR.EIA.enabledActionFailure) {
        return this.itemHitRate(target);
    } else {
        return this.itemSuccess(target) * this.itemHitRate(target);
    }
};

Game_Action.prototype.itemHitRate = function (target) {
    var custom = FTKR.EIA.customHit;
    if (this.isPhysical()) {
        return custom.enabled ?
            this.itemCustomHitRate(custom.pFormula, target) :
            this.itemCustomHitRate(this.subject().hit, target);
    } else if (this.isMagical()) {
        return custom.enabled ?
            this.itemCustomHitRate(custom.mFormula, target) :
            this.itemCustomHitRate(1, target);
    } else {
        return 1;
    }
};

Game_Action.prototype.itemCustomHitRate = function (formula, target) {
    FTKR.setGameData(this.subject(), target, this.item());
    var repeats = this.item().sepRepeats;
    if (repeats && repeats.hitRate) {
        return FTKR.evalFormula(repeats.hitRate);
    } else {
        return FTKR.evalFormula(formula);
    }
};

FTKR.EIA.Game_Action_itemEva = Game_Action.prototype.itemEva;
Game_Action.prototype.itemEva = function (target) {
    var custom = FTKR.EIA.customEva;
    if (custom.enabled) {
        if (this.isPhysical()) {
            return this.itemCustomEvaRate(custom.pFormula, target);
        } else if (this.isMagical()) {
            return this.itemCustomEvaRate(custom.mFormula, target);
        } else {
            return 0;
        }
    } else {
        return FTKR.EIA.Game_Action_itemEva.call(this, target);
    }
};

Game_Action.prototype.itemCustomEvaRate = function (formula, target) {
    FTKR.setGameData(this.subject(), target, this.item());
    var repeats = this.item().sepRepeats;
    if (repeats && repeats.evaRate) {
        return FTKR.evalFormula(repeats.evaRate);
    } else {
        return FTKR.evalFormula(formula);
    }
};

//=============================================================================
// Game_ActionResult
//=============================================================================

FTKR.EIA.Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function () {
    FTKR.EIA.Game_ActionResult_clear.call(this);
    this.actionFailure = false;
    this.item = null;
};

Game_ActionResult.prototype.checkRepeatFailure = function (result) {
    if (!result) BattleManager._repeatFailure = true;
    return result;
};

Game_ActionResult.prototype.isActionFailure = function () {
    return this.checkRepeatFailure(!this.used || this.actionFailure);
};

FTKR.EIA.Game_ActionResult_isHit = Game_ActionResult.prototype.isHit;
Game_ActionResult.prototype.isHit = function () {
    return this.checkRepeatFailure(FTKR.EIA.Game_ActionResult_isHit.call(this));
};

//=============================================================================
// Window_BattleLog
//=============================================================================

FTKR.EIA.Window_BattleLog_displayActionResults =
    Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function (subject, target) {
    if (FTKR.EIA.enabledActionFailure && target.result().actionFailure) {
        this.push('pushBaseLine');
        this.displayActionFailure(subject, target);
        this.push('waitForNewLine');
        this.push('popBaseLine');
    } else {
        FTKR.EIA.Window_BattleLog_displayActionResults.call(this, subject, target);
    }
};

Window_BattleLog.prototype.displayActionFailure = function (subject, target) {
    var result = target.result();
    if (result.actionFailure) {
        this.push('addText',
            FTKR.EIA.actionFailureMessage.format(subject.name(), result.item.name)
        );
    }
};