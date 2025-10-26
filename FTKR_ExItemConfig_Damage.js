//=============================================================================
// アイテムとスキルのダメージ処理を拡張するプラグイン
// FTKR_ExItemConfig_Damage.js
// プラグインNo : 18
// 作成者     : フトコロ
// 作成日     : 2017/04/14
// 最終更新日 : 2020/01/13
// バージョン : v1.1.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EID = true;

var FTKR = FTKR || {};
FTKR.EID = FTKR.EID || {};

//=============================================================================
/*:
@plugindesc v1.1.2 Plugin that extends item and skill damage processing
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
Implementing this plugin will change the damage dealt by items and skills to the following specifications:

[Damage] = [Damage for Damage ID 0] + [Damage for Damage ID 1] + ...

Damage for each damage ID has a separate setting value and is calculated separately.

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. When using this plugin in conjunction with FTKR_ItemSelfVariables.js, add this plugin below FTKR_ItemSelfVariables.js.

3. This plugin cannot be used in conjunction with FTKR_SkillExpansion.js.

-----------------------------------------------------------------------------
Damage Settings
-----------------------------------------------------------------------------
Applying this plugin will change the damage dealt by skills to the following specifications:

[Damage] = [Damage for Damage ID 0] + [Damage for Damage ID 1] + ...

For each damage ID, attack and defense damage are calculated, and the sum of these results is
the final damage dealt to the opponent.

For example, you can create a skill with multiple Elements that deals different damage for each Elements, or a skill that deals both physical and magical damage.

You can set each damage ID by adding the following note tag to a skill.

<EIC DAMAGEID: x>
code
</EIC DAMAGEID>

By setting a skill ID for each damage ID, damage calculation for each damage ID is based on that skill ID's Elements, damage formula,
hit type, and damage type.
The skill ID's effect and TP gain will also be calculated along with the damage.
Damage ID 0 Reflections the database settings of the base skill.

**************************************************************************
Note: When adding damage IDs, be sure to add them in order, starting with ID 1.
**********************************************************************

[Items that can be used in code]
SkillId: y
Skill ID: y
: Copies the skill settings for skill ID y.
: Essentially, this code creates settings for each damage ID.

ElementId: y1,y2,...
Elements ID: y1,y2,...
: Adds the Elements specified by Elements IDs y1,y2,...

DamageRate: eval
Damage Multiplier: Formula
: Changes the damage multiplier to the value (%) set in the formula (eval).
: Damage is calculated by multiplying this value by the result of the damage formula.
: If not set, the value of the plugin parameter <Default Rate> is used.

CriticalRate: eval
Critical Multiplier: Formula
: Changes the critical damage multiplier to the value (%) set in the formula (eval).
: If not set, the value of the plugin parameter <Critical Rate> will be used.

Trait Elements: type1,type2,...
Add Trait Elements: type1,type2,...
: Adds Elements to the trait field of the target specified by type1,type2,....
: The characters that can be specified with type* are Actor, Class, Weapon, Armor, and States.

Enabled: eval
Enabling Condition: Formula
: Enables the target's damage ID based on the conditions set in the formula.
: If not set, it is always enabled.
: Cannot be set for damage ID 0.
: If not enabled, it will not be Reflectioned in damage.

[About Formula (eval) Values]
Like the damage formula, you can use non-fixed values by entering a formula. The following codes can be used:
a.param - References the user's parameters. (a.atk is the user's attack power)
b.param - References the target's parameters. (b.atk is the target's attack power)
s[x] - References the state of switch ID x.
v[x] - References the value of variable ID x.
iv[x] - References the value of item self variable ID x. (*1)

(*1) FTKR_ItemSelfVariables.js is required to use self variables.

Input example)
For damage ID 1, when the user is level 11 or higher and switch ID 1 is ON,
adds the damage of skill ID 10.
The damage multiplier is changed to 50%, and critical damage is changed to 400%.
The Elements, hit type, calculation formula, etc. are those of skill ID 10.

<EIC DAMAGEID: 1>
Skill ID: 10
Damage Multiplier: 50
Critical Multiplier: 400
Effective Condition: a.level > 10 && s[1]
</EIC DAMAGEID>

[Plugin Parameter Settings]
<Critical For Each>
:Choose whether to check for a critical hit only once (damage ID 0),
:or for each damage ID.
:Whether to display the "Critical Hit" message is determined by the result of damage ID 0.

-----------------------------------------------------------------------------
About Element Damage Calculation
-----------------------------------------------------------------------------
The plugin parameter <Element Damage Calc> allows you to change how the defense's effectiveness is calculated when attacking with multiple elements.

You can choose from four calculation methods: maximum, average, cumulative, and minimum.

<0: Maximum> :The maximum value of the defense's corresponding elemental effectiveness
will be the final damage multiplier. (Standard method for RPG Maker MV)

Example) A dual-element attack (physical + fire), with the defender's physical effectiveness at 50% and fire effectiveness at 70%
⇒ The final effectiveness is 70% ( = max(50%, 70%))

<1: Average>: The average of the defender's corresponding Elements effectiveness
is the final damage multiplier.

Example) A dual-element attack (physical + fire), with the defender's physical effectiveness at 50% and fire effectiveness at 70%
⇒ The final effectiveness is 60% ( = (50% + 70%) / 2)

<2: Accumulation>: The cumulative value of the defender's corresponding Elements effectiveness
is the final damage multiplier.

Example) A dual-element attack (physical + fire), with the defender's physical effectiveness at 50% and fire effectiveness at 70%
⇒ The final effectiveness is 35% ( = 50% × 70%)

<3: Minimum>: The minimum value of the defender's corresponding Elements effectiveness
is the final damage multiplier.

Example: A dual-element attack (physical + fire) with the defender's physical effectiveness set to 50% and fire effectiveness set to 70%.
⇒ The final effectiveness is 50% ( = min(50%, 70%)).

Please note that this calculation is performed separately for each damage ID.
The following two patterns will result in the same damage if the defender's effectiveness is not set.
However, if the effectiveness is set, the final damage will change.

Pattern 1: Damage ID 0 only
Elements: Physical + Fire
Calculation Formula: 200
⇒ If the defender's physical effectiveness is 50% and fire effectiveness is 70% and set to maximum
200 * 70% = 140 damage

Pattern 2: Damage ID 0 and Damage ID 1
ID 0 Elements: Physical
ID 0 Calculation Formula: 100
ID 1 Elements: Fire
ID 1 Calculation Formula: 100
⇒ If the defender's physical effectiveness is 50% and fire effectiveness is 70% and set to maximum
100 * 50% + 100 * 70% = 120 damage

-----------------------------------------------------------------------------
License for this plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2020 Futokoro
http://opensource.org/licenses/mit-license.php

----------------------------------------------------------------------------
Change History
----------------------------------------------------------------------------

v1.1.2 - 2020/01/13: Bug fixes and Traits additions
1. Fixed an issue where the critical hit message would not be displayed when the damage multiplier was set to 0 for damage IDs 1 and above, regardless of the result of the critical hit for damage ID 0.
2. Fixed the damage ID calculation formula to now reference the target's parameters.

v1.1.1 - 2020/01/11: Bug fixes
1. Fixed an issue with reading plugin parameters.

v1.1.0 - 2018/08/05: Traits additions
1. Added a Traits to exclude 100% Elements effectiveness when calculating Elements damage.

v1.0.1 - April 29, 2017: Supports FTKR_ItemSelfVariables v1.1.0 and later.

v1.0.0 - April 14, 2017: First version released.

-----------------------------------------------------------------------------

@param ---属性ダメージ計算---
@text --- Elements Damage Calculation ---

@param Elements Damage Calc
@desc Damage calculation for multiple Elements: 0 - Max, 1 - Average, 2 - Accumulation, 3 - Min
@default 0
@type select
@option maximum
@value 0
@option average
@value 1
@option cumulative
@value 2
@option minimum
@value 3

@param Exclude 100% Elements
@desc If it is maximum or average, will 100% Elements effectiveness be excluded when calculating damage?
@default false
@type boolean
@on exclude
@off Do not exclude

@param ---ダメージ倍率---
@text ---Damage multiplier---

@param Damage Rate
@desc Default Damage Multiplier (%)
@default 100

@param ---クリティカル---
@text ---critical---

@param Critical For Each
@desc Whether to perform critical hit detection for each damage ID: 0 - Do not detect, 1 - Detect
@default 0
@type select
@option No judgment
@value 0
@option judge
@value 1

@param Critical Rate
@desc Default Critical Damage Multiplier (%)
@default 300
*/

/*:ja
@plugindesc v1.1.2 アイテムとスキルのダメージ処理を拡張するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、アイテムやスキルによって与えるダメージを
以下の仕様に変更します。

 [ダメージ] = [ダメージID 0 のダメージ] + [ダメージID 1 のダメージ] + ...

各ダメージIDのダメージは、それぞれ、別の設定値を持ち、別に計算します。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. FTKR_ItemSelfVariables.js と併用する場合は、本プラグインは、
   FTKR_ItemSelfVariables.jsよりも下の位置になるように追加してください。

3. 本プラグインは、FTKR_SkillExpansion.jsと組み合わせて使用できません。


-----------------------------------------------------------------------------
ダメージの設定
-----------------------------------------------------------------------------
本プラグインを適用することで、スキルによって与えるダメージを、以下の仕様に
変更します。

 [ダメージ] = [ダメージID 0 のダメージ] + [ダメージID 1 のダメージ] + ...

ダメージID毎に、攻撃と防御によるダメージ計算を行い、その結果の合計値を
最終的なダメージとして相手に与えます。

例えば、「複数の属性を持ち、かつ属性毎に与えるダメージが異なるスキル」や
「物理ダメージと魔法ダメージを併せ持つスキル」などを作ることができます。

スキルに以下のノートタグを追記することで、各ダメージIDを設定できます。

<EIC ダメージID: x>
code
</EIC ダメージID>

ダメージID毎にスキルIDを設定することで、そのスキルIDの属性、ダメージ計算式、
命中タイプ、ダメージタイプを元に各ダメージIDのダメージ計算を行います。
また、そのスキルIDの使用効果や得TPについても、ダメージとともに発生します。
ダメージID0 は、ベースとなるスキルのデータベース上の設定が反映されます。

**********************************************************************
注意：ダメージIDを追加する場合は、必ずID1 から順番に追加してください。
**********************************************************************


[code に使用できる項目]
SkillId: y
スキルID: y
   :スキルID y のスキル設定をコピーします。
   :基本的に、このコードを使って、各ダメージIDの設定を作成します。

ElementId: y1,y2,...
属性ID: y1,y2,...
   :属性ID y1,y2,...で指定した属性を追加します。

DamageRate: eval
ダメージ倍率: 計算式
   :ダメージ倍率を 計算式(eval)で設定した値(%)に変更します。
   :この値をダメージ計算式の結果に対して積算したものがダメージになります。
   :設定しない場合は、プラグインパラメータ<Default Rate>の値を使用します。

CriticalRate: eval
クリティカル倍率: 計算式
   :クリティカルのダメージ倍率を 計算式(eval)で設定した値(%)に変更します。
   :設定しない場合は、プラグインパラメータ<Critical Rate>の値を使用します。

Trait Elements: type1,type2,...
特徴の属性追加: type1,type2,...
   :type1,type2,... で指定した対象の特長欄の属性を追加します。
   :type* で指定できる文字は、Actor,Class,Weapon,Armor,States です。

Enabled: eval
有効条件: 計算式
   :対象のダメージID を計算式で設定した条件で有効にします。
   :設定しない場合は、常に有効です。
   :ダメージID 0 に対しては設定できません。
   :有効になっていない場合は、ダメージに反映しません。


[計算式(eval)の値について]
計算式は、ダメージ計算式のように、計算式を入力することで、固定値以外の値を
使用することができます。以下のコードを使用できます。
 a.param - 使用者のパラメータを参照します。(a.atk で使用者の攻撃力)
 b.param - 攻撃対象のパラメータを参照します。(b.atk で攻撃対象の攻撃力)
 s[x]    - スイッチID x の状態を参照します。
 v[x]    - 変数ID x の値を参照します。
 iv[x]   - アイテムのセルフ変数ID x の値を参照します。(*1)

(*1) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。


入力例）
ダメージID1 として、使用者のレベルが11以上かつスイッチID1がONの時に、
スキルID10のスキルのダメージを追加します。
ダメージ倍率は50%、クリティカルダメージは400%に変更します。
属性や命中タイプ、計算式等は、スキルID10のものを使用します。

<EIC ダメージID: 1>
スキルId: 10
ダメージ倍率: 50
クリティカル倍率: 400
有効条件: a.level > 10 && s[1]
</EIC ダメージID>


[プラグインパラメータの設定項目]
<Critical For Each>
   :クリティカルの判定を、ダメージID0 の最初の1回だけにするか、
   :それともダメージID毎に判定するか選べます。
   :なお、「敵に会心」のメッセージを表示させるかどうかは、
   :ダメージID0の結果で判定します。

-----------------------------------------------------------------------------
属性ダメージの計算方法について
-----------------------------------------------------------------------------
プラグインパラメータ<Element Damage Calc>の設定値により、複数の属性を持った
攻撃をした場合の、防御側の有効度の計算方法を変更することができます。

変更できる計算方法は、最大、平均、累積、最小の４種類です。

 <0:最大> :防御側の該当する属性有効度の最大値が
         最終的なダメージ倍率になります。(ツクールMVの標準方式)

  例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
      ⇒最終的な有効度は70% ( = max(50%, 70%) )


 <1:平均> :防御側の該当する属性有効度の平均値が
         最終的なダメージ倍率になります。

  例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
      ⇒最終的な有効度は60% ( = (50% + 70%) / 2 )


 <2:累積> :防御側の該当する属性有効度を累積した値が
         最終的なダメージ倍率になります。

  例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
      ⇒最終的な有効度は35% ( = 50% × 70% )


 <3:最小> :防御側の該当する属性有効度の最小値が
         最終的なダメージ倍率になります。

  例) 物理＋炎の2属性攻撃で、防御側の有効度が物理50%、炎70%の場合
      ⇒最終的な有効度は50% ( = min(50%, 70%) )


なお、この計算は、ダメージID毎に別に行われますので注意してください。
以下の2パターンは、防御側の有効度の設定が無ければ同じダメージですが、
有効度の設定がある場合は最終的なダメージが変わります。

パターン1 ダメージID 0 のみ
 属性   :物理＋炎
 計算式 :200
   ⇒防御側の有効度が物理50%、炎70%の場合で最大設定の場合
       200 * 70% = 140ダメージ

パターン2 ダメージID 0 と ダメージID 1
 ID0 属性   :物理
 ID0 計算式 :100
 ID1 属性   :炎
 ID1 計算式 :100
   ⇒防御側の有効度が物理50%、炎70%の場合で最大設定の場合
       100 * 50% + 100 * 70% = 120ダメージ


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2020 Futokoro
http://opensource.org/licenses/mit-license.php


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.1.2 - 2020/01/13 : 不具合修正、機能追加
   1. ダメージID1以降でダメージ倍率を0にした場合に、ダメージID0での
      クリティカル判定の結果を問わず、会心メッセージを表示しない不具合を修正。
   2. ダメージIDの計算式に攻撃対象のパラメータも参照できるように修正。

v1.1.1 - 2020/01/11 : 不具合修正
   1. プラグインパラメータの読み取り部の不具合を修正。

v1.1.0 - 2018/08/05 : 機能追加
   1. 属性ダメージ計算時に100%の属性有効度を除外できる機能を追加。

v1.0.1 - 2017/04/29 : FTKR_ItemSelfVariables の v1.1.0以降に対応

v1.0.0 - 2017/04/14 : 初版公開

-----------------------------------------------------------------------------

@param ---属性ダメージ計算---
@text ---属性ダメージ計算---

@param Elements Damage Calc
@desc 複数属性に対するダメージ計算方法 0 - 最大, 1 - 平均, 2 - 累積, 3 - 最小
@default 0
@type select
@option 最大
@value 0
@option 平均
@value 1
@option 累積
@value 2
@option 最小
@value 3

@param Exclude 100% Elements
@desc 最大または平均の場合、ダメージ計算時に100%の属性有効度を除外するか
@default false
@type boolean
@on 除外する
@off 除外しない

@param ---ダメージ倍率---
@text ---ダメージ倍率---

@param Damage Rate
@desc デフォルトのダメージ倍率(%)
@default 100

@param ---クリティカル---
@text ---クリティカル---

@param Critical For Each
@desc ダメージID毎にクリティカル判定を行うか 0 - 判定しない, 1 - 判定する
@default 0
@type select
@option 判定しない
@value 0
@option 判定する
@value 1

@param Critical Rate
@desc デフォルトのクリティカルダメージ倍率(%)
@default 300
*/

//=============================================================================

(function () {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExItemConfig_Damage');

    FTKR.EID = {
        elementDamageCalc: Number(parameters['Elements Damage Calc'] || 0),
        excludeElement: JSON.parse(parameters['Exclude 100% Elements'] || false),
        defDamageRate: String(parameters['Damage Rate'] || '0'),
        defCriticalRate: String(parameters['Critical Rate'] || '0'),
        criticalForEach: Number(parameters['Critical For Each'] || 0),
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

    var readEntrapmentCodeToTextEx = function (obj, codeTitles) {
        var regs = convertEntrapmentRegArrayEx(codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var results = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (matchRegs(line, regs, 'start')) {
                var data = {
                    id: RegExp.$1,
                    text: ''
                };
                setMode = 'read';
            } else if (matchRegs(line, regs, 'end')) {
                setMode = 'none';
                results.push(data);
            } else if (setMode === 'read') {
                data.text += line + ';';
            }
        }
        return results;
    };

    var convertEntrapmentRegArrayEx = function (codeTitles) {
        return codeTitles.map(function (codeTitle) {
            return {
                start: new RegExp('<' + codeTitle + ':[ ]*(.+)>', 'i'),
                end: new RegExp('<\/' + codeTitle + '>', 'i')
            };
        });
    };

    var matchRegs = function (data, regs, prop) {
        return regs.some(function (reg) {
            return prop ? data.match(reg[prop]) : data.match(reg);
        });
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _EID_DatabaseLoaded = false;
    var _EID_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!_EID_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_EID_DatabaseLoaded) {
            this.eidDamageIdNoteTags($dataSkills);
            this.eidDamageIdNoteTags($dataItems);
            _EID_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.eidDamageIdNoteTags = function (group) {
        var note1a = /<(?:EIC ダメージID):[ ]*(\d+)>/i;
        var note1aj = /<(?:EIC DAMAGEID):[ ]*(\d+)>/i;
        var note1b = /<\/(?:EIC ダメージID)>/i;
        var note1bj = /<\/(?:EIC DAMAGEID)>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            var setMode = 'none';
            obj.sepdamages = [];

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1a) || line.match(note1aj)) {
                    var data = {
                        id: Number(RegExp.$1),
                        text: ''
                    };
                    setMode = 'anydata';
                } else if (note1b.test(line) || note1bj.test(line)) {
                    setMode = 'none';
                    obj.sepdamages.push(data);
                } else if (setMode === 'anydata') {
                    data.text += line + ';';
                }
            }
            this.makeEidData(obj);
            obj.sepdamages = [];
        }
    };

    // skillの拡張部分(sepdata)を作成する
    DataManager.makeEidData = function (skill) {
        this.makeEidDamagesBase(skill);
        this.setEidDamagesNotetags(skill);
    };

    DataManager.makeEidDamagesBase = function (skill) {
        skill.damages = [];
        skill.damages[0] = this.setEidDamage(skill.id);
    };

    DataManager.setEidDamage = function (skillId) {
        var damage = {};
        var setSkill = $dataSkills[skillId]
        var setDamage = setSkill.damage;
        for (var list in setDamage) {
            damage[list] = setDamage[list];
        }
        damage.rate = FTKR.EID.defDamageRate;
        damage.criticalRate = FTKR.EID.defCriticalRate;
        damage.hitType = setSkill.hitType;
        damage.itemElements = [];
        damage.id = setSkill.id;
        damage.addElmIds = [];
        damage.enabled = '';
        return damage;
    };

    DataManager.setEidDamagesNotetags = function (skill) {
        for (var t = 0; t < skill.sepdamages.length; t++) {
            var sepdata = skill.sepdamages[t];
            if (sepdata) {
                var case1 = /(?:SKILLID):[ ]*(\d+)/i;
                var case1j = /(?:スキルID):[ ]*(\d+)/i;
                var case2 = /(?:ELEMENTID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
                var case2j = /(?:属性ID):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
                var case3 = /(?:DAMAGERATE):[ ]*(.+)/i;
                var case3j = /(?:ダメージ倍率):[ ]*(.+)/i;
                var case4 = /(?:CRITICALRATE):[ ]*(.+)/i;
                var case4j = /(?:クリティカル倍率):[ ]*(.+)/i;
                var case5 = /(?:TRAIT ELEMENTS):[ ]*(.+)/i;
                var case5j = /(?:特徴の属性追加):[ ]*(.+)/i;
                var case6 = /(?:ENABLED):[ ]*(.+)/i;
                var case6j = /(?:有効条件):[ ]*(.+)/i;

                var datas = sepdata.text.split(';');
                for (var i = 0; i < datas.length; i++) {
                    var data = datas[i];
                    var dataId = sepdata.id;
                    var item = skill.damages[dataId];
                    if (data.match(case1) || data.match(case1j)) {
                        var skillId = Number(RegExp.$1);
                        skill.damages[dataId] = this.setEidDamage(skillId);
                    } else if (data.match(case2) || data.match(case2j)) {
                        var elmIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                        skill.damages[dataId].addElmIds = [];
                        if (item.elementId !== -1) {
                            elmIds.forEach(function (elmId) {
                                if (item.elementId !== elmId) {
                                    skill.damages[dataId].addElmIds.push(elmId);
                                }
                            });
                        }
                    } else if (data.match(case3) || data.match(case3j)) {
                        skill.damages[dataId].rate = RegExp.$1;
                    } else if (data.match(case4) || data.match(case4j)) {
                        skill.damages[dataId].criticalRate = RegExp.$1;
                    } else if (data.match(case5) || data.match(case5j)) {
                        var text = String(RegExp.$1).replace(/\s/g, "");
                        var types = text.split(',');
                        types.forEach(function (type) {
                            skill.damages[dataId].itemElements.push(type);
                        });
                    } else if (data.match(case6) || data.match(case6j)) {
                        skill.damages[dataId].enabled = String(RegExp.$1);
                    }
                }
            }
        }
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    var _EID_Game_Action_initialize = Game_Action.prototype.initialize;
    Game_Action.prototype.initialize = function (subject, forcing) {
        _EID_Game_Action_initialize.call(this, subject, forcing);
        this._damageId = 0;
    };

    Game_Action.prototype.itemBase = function () {
        return this._item.object();
    };

    Game_Action.prototype.itemDamage = function () {
        return this.itemBase().damages[this._damageId];
    };

    Game_Action.prototype.damageSkill = function () {
        return $dataSkills[this.itemDamage().id];
    };

    //書き換え
    Game_Action.prototype.item = function () {
        return this._damageId ? this.damageSkill() : this.itemBase();
    };

    /*-------------------------------------------------------------
    スキル実行処理の修正
    -------------------------------------------------------------*/
    var _EID_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        this._damageId = 0;
        this._consoleCount = 0;
        _EID_Game_Action_apply.call(this, target);
        this.eidDamageIdApply(target);
    };

    Game_Action.prototype.eidDamageIdApply = function (target) {
        var result = target.result();
        var len = this.item().damages.length;
        if (result.isHit() && len > 1) {
            for (var i = 1; i < len; i++) {
                this._damageId = i;
                if (this.item().damage.type > 0 && this.evalDamagesEnabled(this.itemBase(), target)) {
                    var critical = FTKR.EID.criticalForEach ?
                        (Math.random() < this.itemCri(target)) :
                        result.critical;
                    var value = this.makeDamageValue(target, critical);
                    this.executeEidDamage(target, value);
                    this.item().effects.forEach(function (effect) {
                        this.applyItemEffect(target, effect);
                    }, this);
                    this.applyItemUserEffect(target);
                }
            }
        }
        this._damageId = 0;
    };

    /*-------------------------------------------------------------
    ダメージ計算の修正
    -------------------------------------------------------------*/

    Game_Action.prototype.evalDamagesEnabled = function (item, target) {
        FTKR.setGameData(this.subject(), target, item);
        var enabled = item.damages[this._damageId].enabled;
        return !enabled ? true : FTKR.evalFormula(enabled);
    };

    //書き換え
    Game_Action.prototype.evalDamageFormula = function (target) {
        var item = this.item();
        FTKR.setGameData(this.subject(), target, item);
        var value = FTKR.evalFormula(item.damage.formula);
        if (value) {
            var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
            value = Math.max(value, 0) * sign;
        }
        return this.applyDamageRate(value);
    };

    Game_Action.prototype.applyDamageRate = function (damage) {
        return damage * this.itemDamageRate() / 100;
    };

    Game_Action.prototype.itemDamageRate = function () {
        FTKR.gameData.item = this.itemBase();
        return FTKR.evalFormula(this.itemDamage().rate)
    };

    //書き換え
    Game_Action.prototype.applyCritical = function (damage) {
        return damage * this.itemDamageCriticalRate() / 100;
    };

    Game_Action.prototype.itemDamageCriticalRate = function () {
        FTKR.gameData.item = this.itemBase();
        return FTKR.evalFormula(this.itemDamage().criticalRate)
    };

    //ダメージID1以降でダメージ倍率を0にしても、ダメージID0でのクリティカル判定が無効にならないように修正。
    Game_Action.prototype.executeEidDamage = function (target, value) {
        var result = target.result();
        var critical = result.critical;
        this.executeDamage(target, value);
        result.critical = critical;
    };

    /*-------------------------------------------------------------
    属性有効度の計算の修正
    -------------------------------------------------------------*/
    //書き換え
    Game_Action.prototype.calcElementRate = function (target) {
        var elementIds = this.isElementIds(this.itemDamage());
        switch (FTKR.EID.elementDamageCalc) {
            case 1:
                return this.elementsAverageRate(target, elementIds);
            case 2:
                return this.elementsAccumlateRate(target, elementIds);
            case 3:
                return this.elementsMinRate(target, elementIds);
        }
        return this.elementsMaxRate(target, elementIds);
    };

    Game_Action.prototype.isElementIds = function (itemDamage) {
        return itemDamage.elementId < 0 ? this.subject().attackElements() : this.isSkillElements(itemDamage);
    };

    Game_Action.prototype.isSkillElements = function (itemDamage) {
        return [itemDamage.elementId].concat(itemDamage.addElmIds, this.addTraitsElementId(itemDamage));
    };

    Game_Action.prototype.addTraitsElementId = function (itemDamage) {
        var list = [];
        var code = Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
        if (!itemDamage.itemElements) return list;
        itemDamage.itemElements.forEach(function (type) {
            switch (type) {
                case 'Actor':
                    list = list.concat(this.edTraitsSet(code, this.actorData()));
                    break;
                case 'Class':
                    list = list.concat(this.edTraitsSet(code, this.classData()));
                    break;
                case 'Weapon':
                    list = list.concat(this.edTraitsALLSet(code, this.weaponsData()));
                    break;
                case 'Armor':
                    list = list.concat(this.edTraitsALLSet(code, this.armorsData()));
                    break;
                case 'States':
                    list = list.concat(this.edTraitsALLSet(code, this.statesData()));
                    break;
            }
        }, this);
        return list;
    };

    Game_Action.prototype.edTraitsALLSet = function (code, subjects) {
        var list = [];
        for (var i = 0; i < subjects.length; i++) {
            list = list.concat(this.edTraitsSet(code, subjects[i]));
        }
        return list;
    };

    Game_Action.prototype.edTraitsSet = function (code, subject) {
        var list = [];
        subject.traits.forEach(function (trait) {
            if (trait.code === code) list.push(trait.dataId);
        });
        return list;
    };

    Game_Action.prototype.actorData = function () {
        return this.subject() && this.subject().isActor() ? $dataActors[this.subject().actorId()] : false;
    };

    Game_Action.prototype.classData = function () {
        return this.subject() && this.subject().isActor() ? this.subject().currentClass() : false;
    };

    Game_Action.prototype.weaponsData = function () {
        return this.subject() && this.subject().isActor() ? this.subject().weapons() : false;
    };

    Game_Action.prototype.armorsData = function () {
        return this.subject() && this.subject().isActor() ? this.subject().armors() : false;
    };

    Game_Action.prototype.statesData = function () {
        return this.subject() ? this.subject().states() : false;
    };

    //書き換え
    Game_Action.prototype.elementsMaxRate = function (target, elements) {
        if (elements.length > 0) {
            var exclude = 0;
            var maxRate = Math.max.apply(null, elements.map(function (elementId) {
                var rate = target.elementRate(elementId);
                if (FTKR.EID.excludeElement && rate == 1) {
                    exclude = 1;
                    return null;
                } else {
                    return rate;
                }
            }, this));
            return maxRate || exclude;
        } else {
            return 1;
        }
    };

    Game_Action.prototype.elementsAverageRate = function (target, elements) {
        if (!elements.length) return 1;
        var value = 0;
        var exclude = 0;
        var count = 0;
        elements.forEach(function (elementId) {
            var rate = target.elementRate(elementId);
            if (FTKR.EID.excludeElement && rate == 1) {
                exclude = 1;
                count++
                return;
            }
            value += rate;
        });
        var calcElms = elements.length - count;
        if (!calcElms) return 1;
        if (!value) return exclude;
        return value / calcElms;
    };

    Game_Action.prototype.elementsAccumlateRate = function (target, elements) {
        if (!elements.length) return 1;
        var value = 1;
        elements.forEach(function (elementId) {
            value *= target.elementRate(elementId);
        });
        return value;
    };

    Game_Action.prototype.elementsMinRate = function (target, elements) {
        if (!elements.length) return 1;
        return Math.min.apply(null, elements.map(function (elementId) {
            return target.elementRate(elementId);
        }, this));
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    //書き換え
    Game_Battler.prototype.gainHp = function (value) {
        this._result.hpDamage += -value;
        this._result.hpAffected = true;
        this.setHp(this.hp + value);
    };

    //書き換え
    Game_Battler.prototype.gainMp = function (value) {
        this._result.mpDamage += -value;
        this.setMp(this.mp + value);
    };

    //書き換え
    Game_Battler.prototype.gainTp = function (value) {
        this._result.tpDamage += -value;
        this.setTp(this.tp + value);
    };

}());//FTKR_ExItemConfig_Damage.js END