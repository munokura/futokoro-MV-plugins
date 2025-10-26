//=============================================================================
// 変数の操作を拡張するプラグイン
// FTKR_ExVariablesChange.js
// プラグインNo : 23
// 作成者     : フトコロ
// 作成日     : 2017/04/18
// 最終更新日 : 2018/07/01
// バージョン : v1.2.4
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EVC = true;

var FTKR = FTKR || {};
FTKR.EVC = FTKR.EVC || {};

//=============================================================================
/*:
@plugindesc v1.2.4 Plugin that extends variable operations
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
By implementing this plugin, you can manipulate variables and switches in the following situations.

1. When items, weapons, or armor are acquired or removed.
2. When an item or skill is used.
3. At the end of battle.

-----------------------------------------------------------------------------
Setup
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

----------------------------------------------------------------------------
When items, weapons, or armor are acquired or removed.
----------------------------------------------------------------------------
By adding a note tag to the Note field, you can change variables and switches in the following situations.

Applies to: Items, weapons, and armor

1. Execute when purchased from the shop
: Executes each time if purchased multiple times from the shop.
<EVC BUY>
Calculation formula
</EVC BUY>

2. Execute when sold from the shop
: Executes each time if sold multiple times from the shop.
<EVC SELL>
Calculation formula
</EVC SELL>

3. Executes when the number of items increases.
<EVC GAIN>
Calculation formula
</EVC GAIN>

4. Executes when the number of items decreases.
<EVC LOSE>
Calculation formula
</EVC LOSE>

-----------------------------------------------------------------------------
When using an item or skill
-----------------------------------------------------------------------------
Adding a notetag to the Note field will change variables and switches in the following situations.

Applies to: Items, skills, actors, enemies, classes, equipment, and states.

Note that the order in which variables set in tags are calculated is as follows:
Item/Skill ⇒ Actor/Enemy ⇒ Class ⇒ Equipment ⇒ State

<When an Item/Skill is Used>

1. Executes when used, regardless of success or failure.

<EVC USE>
Calculation Formula
</EVC USE>

2. Executes when used successfully.

<EVC SUCCESS>
Calculation Formula
</EVC SUCCESS>

3. Executes when used unsuccessfully (misses or is Evasiond).

<EVC FAILURE>
Calculation Formula
</EVC FAILURE>

4. Executes when damage is dealt.

<EVC DAMAGE>
Calculation Formula
</EVC DAMAGE>

6. Executes when damage is dealt and the enemy is defeated.
(Executes when an actor defeats an enemy, or when the enemy is defeated.)

<EVC KILL>
Calculation Formula
</EVC KILL>

<When Using an Item/Skill>

1. Executes when damage is taken.

<EVC RECEIVE_DAM>
Calculation Formula
</EVC RECEIVE_DAM>

2. Executes when Evading

<EVC When Evading>
Calculation Formula
</EVC When Evading>

-----------------------------------------------------------------------------
At the End of Battle
-----------------------------------------------------------------------------
By adding a note tag to the Note field, you can change variables and switches in the following situations.

Applies to: Actor, Enemy, Class, Equipment, State

Note that the order in which variables set with tags are calculated is as follows:
Actor ⇒ Class ⇒ Equipment ⇒ State
Actor ⇒ Enemy

This process is executed for actors and enemies who participated in battle.
It is executed even if the actor is Collapse.

1. Executes when battle ends: This process is executed last.

<EVC End of Battle>
Calculation Formula
</EVC End of Battle>

2. Executes when the player wins the battle.

<EVC Victory>
Calculation Formula
</EVC Victory>

3. Executes when the player loses the battle.

<EVC Defeat>
Calculation Formula
</EVC Defeat>

4. Executes when the battle ends due to an escape.

<EVC Escape>
Calculation Formula
</EVC Escape>

The end-of-battle generic process does not have a user or target.
Self variables cannot be used.

-----------------------------------------------------------------------------
About generic plugin parameter processing
-----------------------------------------------------------------------------
You can specify a process to be executed every time for each situation, without specifying it using tags such as items or actors.

This generic process is executed after any tag-based processing for items, actors, etc.

To execute multiple calculations, separate the formulas with semicolons (;), as shown below.

Example)
v[1] += 1; v[2] += 1

-----------------------------------------------------------------------------
About Calculation Formulas
----------------------------------------------------------------------------
Calculation formulas (eval) allow you to use non-fixed values by entering a formula, such as the damage formula.
The following codes can be used:
s[x] - Represents the value of switch ID x.
v[x] - Represents the value of variable ID x.
a - References the user's game data. (Only if a user exists.)
b - References the target's game data. (Only if a target exists.)
item - References the data of the used item. (*1)
av[x] - Represents the value of the user's self variable ID x. (*2)
bv[x] - Represents the value of the target's self variable ID x. (*2)
iv[x] - Represents the value of the item's self variable ID x. (*1)(*2)
number - Represents the number of items when buying, selling, or increasing/decreasing.
result - References the result of using a skill or item.
Get the amount of HP damage with result.hpDamage.

(*1) Items refer to skills or items used, or items purchased or sold.
(*2) FTKR_ItemSelfVariables.js is required to use self variables.

[Configuration Example]
Set the following notetags on items to manipulate variables when purchasing.

<EVC BUY>
s[1] = true
v[10] = 10
iv[1] += v[5]
iv[2] += number
</EVC BUY>

Turn switch ID1 ON.
Assign 10 to variable ID10.
Add the value of variable ID5 to self variable ID1 of the purchased item.
Add the number of items purchased to self variable ID2 of the purchased item.

<Notes on variable calculations>
In-game variables are initially set to unknown values other than 0.
Therefore, if you have never assigned a value to an in-game variable,
running a calculation such as v[x] += 1 will result in an incorrect calculation.

Be sure to initialize the in-game variable ID (assign it to 0) before use,
or enter it in the calculation formula as shown below.

Example: To add 1 to variable ID 10:
if(!v[10]) v[10] = 0
v[10] += 1

Note that the self variable in FTKR_ItemSelfVariables.js is always assigned a value of 0
at the start of the game, so the above step is not necessary.

-----------------------------------------------------------------------------
About the License of This Plugin (License)
-----------------------------------------------------------------------------
This plugin is released under the MIT License.
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php

----------------------------------------------------------------------------
Change History
----------------------------------------------------------------------------

v1.2.4 - 2018/07/01: Specification Changes
1. Changed the timing of data acquisition upon damage to avoid conflicts with other plugins.

v1.2.3 - 2017/08/24: Bug Fixes
1. Fixed an issue where actor job IDs were not being acquired correctly.

v1.2.2 - 2017/06/07: Bug Fixes
1. Fixed the timing of processing upon receiving damage. (Bug fix in v1.2.1)

v1.2.1 - June 7, 2017: Bug fixes and Traits additions
1. Fixed an issue where game data for the user, target, and skill (item) used could not be referenced when taking damage.
2. Tags at the end of battle are now applied to enemies.
3. The timing of processing when dealing damage has been changed.

v1.2.0 - June 5, 2017: Traits additions
1. Added functionality for item and skill evasion.
2. Reviewed processing.

v1.1.1 - May 19, 2017: Help revisions

v1.1.0 - May 11, 2017: Traits additions
1. Added functionality for when enemies are defeated and when battle ends.
2. Added general-purpose calculation processing that can be set via plugin parameters.

v1.0.6 - 2017/05/03: Bug Fixes
1. Fixed an issue where non-damage situations were not being processed correctly.
2. Fixed an issue where calculation formulas were not being processed correctly.

v1.0.5 - 2017/05/02: Bug Fixes
1. Changed the processing order when adding or subtracting items.

v1.0.4 - 2017/04/28: Bug Fixes
1. Added exception handling when adding or subtracting items.

v1.0.3 - 2017/04/26: Traits Additions
1. Added variable manipulation functionality when taking damage.
2. Expanded the scope of tag targets when using items or skills.

v1.0.2 - 2017/04/25: Bug Fixes
1. Fixed an issue where the target's self variable was not being Reflectioned correctly.

v1.0.1 - April 19, 2017: Bug fixes

v1.0.0 - April 18, 2017: First version created

-----------------------------------------------------------------------------

@param --アイテム増減時--
@text --When items increase or decrease--

@param Buy
@desc General processing when purchasing an item

@param Gain
@desc General processing when items increase

@param Sell
@desc General processing when selling items

@param Lose
@desc General processing when items decrease

@param --アイテム・スキル使用時--
@text --When using an item or skill--

@param Use
@desc General processing when using items and skills

@param Success
@desc General processing when an item or skill is successfully used

@param Failure
@desc General processing when an item or skill fails to be used

@param Damage
@desc General processing when dealing damage using an item or skill

@param Receive Damage
@desc General processing when receiving damage from an item or skill

@param Evade
@desc General processing when avoiding the use of an item or skill

@param Kill
@desc General processing when defeating an enemy using an item or skill

@param --戦闘終了時--
@text --At the end of the battle--

@param Battle End
@desc General processing at the end of battle

@param Battle Victory
@desc General processing when winning a battle

@param Battle Escape
@desc General processing when fleeing from battle

@param Battle Defeat
@desc General processing when losing a battle
*/

/*:ja
@plugindesc v1.2.4 変数の操作を拡張するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、以下の状況において変数やスイッチを
操作することができます。

1. アイテム、武器、防具の増減時
2. アイテム、スキルの使用時
3. 戦闘終了時


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。


-----------------------------------------------------------------------------
アイテム、武器、防具の増減時
-----------------------------------------------------------------------------
ノートタグをメモ欄に追記すると以下の状況において、変数・スイッチの
変更ができます。

対象：アイテム、武器、防具

1. ショップで購入した時に実行
   :ショップで複数回購入した場合、その都度実行します。
<EVC 購入時>
計算式
</EVC 購入時>


2. ショップで売却した時に実行
   :ショップで複数回売却した場合、その都度実行します。
<EVC 売却時>
計算式
</EVC 売却時>


3. アイテム数が増加すると実行
<EVC 増加時>
計算式
</EVC 増加時>


4. アイテム数が減少すると実行
<EVC 減少時>
計算式
</EVC 減少時>


-----------------------------------------------------------------------------
アイテム、スキルの使用時
-----------------------------------------------------------------------------
ノートタグをメモ欄に追記すると以下の状況において、変数・スイッチの
変更ができます。

対象：アイテム、スキル、アクター、エネミー、クラス、装備、ステート

なお、タグで設定した変数の計算が行われる順番は以下の通りです。
アイテム/スキル ⇒ アクター/エネミー ⇒ クラス ⇒ 装備 ⇒ ステート

＜アイテム・スキルを使用した場合＞

1. 成功失敗問わずに使用すると実行

<EVC 使用時>
計算式
</EVC 使用時>


2. 使用して成功すると実行

<EVC 使用成功時>
計算式
</EVC 使用成功時>


3. 使用して失敗(命中しない、回避される)すると実行

<EVC 使用失敗時>
計算式
</EVC 使用失敗時>


4. ダメージを与えると実行

<EVC 与ダメージ時>
計算式
</EVC 与ダメージ時>


6. ダメージを与えて敵を倒すと実行
(アクターなら倒したとき、エネミーなら倒されたとき実行)

<EVC 討伐時>
計算式
</EVC 討伐時>


＜アイテム・スキルを使用された場合＞

1. ダメージを受けると実行

<EVC 被ダメージ時>
計算式
</EVC 被ダメージ時>


2. 回避すると実行

<EVC 回避時>
計算式
</EVC 回避時>


-----------------------------------------------------------------------------
戦闘終了時
-----------------------------------------------------------------------------
ノートタグをメモ欄に追記すると以下の状況において、変数・スイッチの
変更ができます。

対象：アクター、エネミー、クラス、装備、ステート

なお、タグで設定した変数の計算が行われる順番は以下の通りです。
アクター ⇒ クラス ⇒ 装備 ⇒ ステート
アクター ⇒ エネミー

この処理は、戦闘に参加したアクターおよびエネミーに対して実行します。
戦闘不能状態でも実行します。

1. 戦闘が終了すると実行  :この処理は最後に実行します。

<EVC 戦闘終了時>
計算式
</EVC 戦闘終了時>


2. プレイヤーが戦闘に勝利すると実行

<EVC 勝利時>
計算式
</EVC 勝利時>


3. プレイヤーが戦闘に敗北すると実行

<EVC 敗北時>
計算式
</EVC 敗北時>


4. 逃走で戦闘終了すると実行

<EVC 逃走時>
計算式
</EVC 逃走時>


戦闘終了時の汎用処理には、使用者、対象者はありません。
また、セルフ変数は使用できません。


-----------------------------------------------------------------------------
プラグインパラメータの汎用処理について
-----------------------------------------------------------------------------
各状況において、アイテムやアクター等のタグで設定しなくても
毎回実行する処理を規定できます。

この汎用処理は、アイテムやアクター等のタグによる処理の後に実行します。

複数の計算を実行する場合は、以下のようにセミコロン(;)で計算式を
区切ってください。

例)
v[1] += 1; v[2] += 1


-----------------------------------------------------------------------------
計算式について
-----------------------------------------------------------------------------
計算式(eval)は、ダメージ計算式のように、計算式を入力することで、
固定値以外の値を使用することができます。以下のコードを使用できます。
 s[x]    - スイッチID x の値を意味します。
 v[x]    - 変数ID x の値を意味します。
 a       - 使用者のゲームデータを参照します。(使用者がいる場合のみ)
 b       - 対象者のゲームデータを参照します。(対象者がいる場合のみ)
 item    - 使用したアイテムのデータを参照します。(*1)
 av[x]   - 使用者のセルフ変数ID x の値を意味します。(*2)
 bv[x]   - 対象者のセルフ変数ID x の値を意味します。(*2)
 iv[x]   - アイテムのセルフ変数ID x の値を意味します。(*1)(*2)
 number  - 購入・売却・増減時のアイテム数を意味します。
 result  - スキル・アイテムを使用した結果を参照します。
           result.hpDamage でHPダメージ量を取得します。

(*1) アイテムとは、使用したスキルまたはアイテム、購入・売却したアイテムの
     ことです。
(*2) セルフ変数を使用する場合は、FTKR_ItemSelfVariables.jsが必要です。


[設定例]
購入時に変数を操作するためアイテムに以下のノートタグを設定する。

<EVC 購入時>
s[1] = true
v[10] = 10
iv[1] += v[5]
iv[2] += number
</EVC 購入時>

スイッチID1 を ON にします。
変数ID10 に 10 を代入します。
購入したアイテムのセルフ変数ID1 に 変数ID5 の値を加算します。
購入したアイテムのセルフ変数ID2 に 購入数を加算します。


＜変数計算における注意点＞
ゲーム内変数は、初期状態では 0 以外の不明な状態になっています。
そのため、一度もゲーム内変数になんらかの値を代入していない場合、
そのまま v[x] += 1 などと計算式を実行すると、正しく計算できません。

ゲーム内変数IDは、使用前に必ず初期化(0 を代入する)するか、
以下のように計算式に記入するようにしてください。

例）変数ID10 に 1 を加算する場合
if(!v[10]) v[10] = 0
v[10] += 1

なお、FTKR_ItemSelfVariables.jsのセルフ変数は、ゲーム開始時に
必ず0を代入するようになっているため、上記の処置は不要です。


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

v1.2.4 - 2018/07/01 : 仕様変更
   1. 他プラグインとの競合回避のためダメージ時のデータ取得タイミングを変更。

v1.2.3 - 2017/08/24 : 不具合修正
   1. アクターの職業IDを正しく取得できていない不具合を修正。

v1.2.2 - 2017/06/07 : 不具合修正
   1. 被ダメージ時の処理タイミングを修正。(v1.2.1の修正による不具合)

v1.2.1 - 2017/06/07 : 不具合修正、機能追加
   1. 被ダメージ時に使用者・対象者・使用スキル(アイテム)のゲームデータを
      参照できない不具合を修正。
   2. 戦闘終了時のタグをエネミーに適用。
   3. 与ダメージ時の処理タイミングを変更。

v1.2.0 - 2017/06/05 : 機能追加
   1. アイテム・スキルの回避時を追加。
   2. 処理の見直し。

v1.1.1 - 2017/05/19 : ヘルプ修正

v1.1.0 - 2017/05/11 : 機能追加
   1. エネミー討伐時や戦闘終了時を追加。
   2. プラグインパラメータで設定できる汎用計算処理を追加。

v1.0.6 - 2017/05/03 : 不具合修正
   1. 非ダメージ時を正しく処理できていない不具合を修正。
   2. 計算式を正しく処理できていない不具合を修正。

v1.0.5 - 2017/05/02 : 不具合修正
   1. アイテム増減時の処理の順番を変更。

v1.0.4 - 2017/04/28 : 不具合修正
   1. アイテム増減時に例外処理を追加。

v1.0.3 - 2017/04/26 : 機能追加
   1. ダメージ時の変数操作機能を追加
   2. アイテム・スキル使用時のタグ適用先を拡張。

v1.0.2 - 2017/04/25 : 不具合修正
   1. 対象者のセルフ変数が正しく反映されない不具合を修正。

v1.0.1 - 2017/04/19 : 不具合修正

v1.0.0 - 2017/04/18 : 初版作成

-----------------------------------------------------------------------------

@param --アイテム増減時--
@text --アイテム増減時--

@param Buy
@desc アイテム購入時の汎用処理

@param Gain
@desc アイテム増加時の汎用処理

@param Sell
@desc アイテム売却時の汎用処理

@param Lose
@desc アイテム減少時の汎用処理

@param --アイテム・スキル使用時--
@text --アイテム・スキル使用時--

@param Use
@desc アイテム・スキル使用時の汎用処理

@param Success
@desc アイテム・スキル使用成功時の汎用処理

@param Failure
@desc アイテム・スキル使用失敗時の汎用処理

@param Damage
@desc アイテム・スキルを使用してダメージを与えた時の汎用処理

@param Receive Damage
@desc アイテム・スキルを使用されてダメージを受けた時の汎用処理

@param Evade
@desc アイテム・スキルを使用されて回避した時の汎用処理

@param Kill
@desc アイテム・スキルを使用してエネミーを討伐した時の汎用処理

@param --戦闘終了時--
@text --戦闘終了時--

@param Battle End
@desc 戦闘終了時の汎用処理

@param Battle Victory
@desc 戦闘勝利時の汎用処理

@param Battle Escape
@desc 戦闘逃走時の汎用処理

@param Battle Defeat
@desc 戦闘敗北時の汎用処理
*/

//=============================================================================

(function () {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExVariablesChange');

    FTKR.EVC.default = {
        buy: String(parameters['Buy'] || ''),
        gain: String(parameters['Gain'] || ''),
        sell: String(parameters['Sell'] || ''),
        lose: String(parameters['Lose'] || ''),
        use: String(parameters['Use'] || ''),
        success: String(parameters['Success'] || ''),
        failure: String(parameters['Failure'] || ''),
        damage: String(parameters['Damage'] || ''),
        receive: String(parameters['Receive Damage'] || ''),
        evade: String(parameters['Evade'] || ''),
        kill: String(parameters['Kill'] || ''),
        end: String(parameters['Battle End'] || ''),
        victory: String(parameters['Battle Victory'] || ''),
        escape: String(parameters['Battle Escape'] || ''),
        defeat: String(parameters['Battle Defeat'] || ''),
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

    if (!FTKR.evalCalcFormula) {
        FTKR.evalCalcFormula = function (formula) {
            var datas = FTKR.gameData;
            try {
                var s = $gameSwitches._data;
                var v = $gameVariables._data;
                var a = datas.user;
                var b = datas.target;
                var item = datas.item;
                var number = datas.number;
                if (b) var result = b.result();
                eval(formula);
            } catch (e) {
                console.error(e);
            }
        };
    }

    //=============================================================================
    // 自作関数
    //=============================================================================

    //挟み込み形式のメタデータを読み取ってtextを返す
    var readEntrapmentCodeToText = function (obj, codeTitles) {
        regs = convertEntrapmentRegArray('EVC', codeTitles);
        var notedata = obj.note.split(/[\r\n]+/);
        var setMode = 'none';
        var text = '';
        notedata.forEach(function (line) {
            if (testRegs(line, regs, 'a')) {
                setMode = 'read';
            } else if (testRegs(line, regs, 'b')) {
                setMode = 'none';
            } else if (setMode === 'read') {
                text += line + ';';
            }
        });
        return text;
    };

    //文字列の配列を挟み込み形式用の正規表現オブジェクトの配列に変換する
    var convertEntrapmentRegArray = function (header, codeTitles) {
        return codeTitles.map(function (str) {
            return {
                a: new RegExp('<' + header + ' ' + str + '>', 'i'),
                b: new RegExp('<\/' + header + ' ' + str + '>', 'i')
            };
        });
    };

    //正規表現オブジェクトの配列regsとdataをテストする
    var testRegs = function (data, regs, prop) {
        return regs.some(function (reg) {
            return prop ? reg[prop].test(data) : reg.test(data);
        });
    };

    //objのメモ欄から <codeTitle[0]: x> から <codeTitle[n]: x>のいずれかの値を読み取って配列で返す
    var readSplitAnyEntrapmentCode = function (obj, codeTitles) {
        var evalsText = readEntrapmentCodeToText(obj, codeTitles);
        return evalsText ? evalsText.split(';') : [];
    };

    //配列内のobjのメモ欄から <codeTitle: x> の値を読み取って配列で返す
    var readItemsEntrapmentCodeSplitTotal = function (items, codeTitles) {
        var result = [];
        items.forEach(function (item) {
            if (item) Array.prototype.push.apply(result, readSplitAnyEntrapmentCode(item, codeTitles));
        });
        return result;
    };

    //target(アクターまたはエネミー)が持つ、codeTitle[0] ~ codeTitle[n]のいずれかで指定したタグの値を配列にして返す
    // クラス、装備、ステートも含む
    var readItemsEntrapmentCodeArray = function (target, codeTitles) {
        var result = [];
        if (target.isActor()) {
            return result.concat(
                readSplitAnyEntrapmentCode(target.actor(), codeTitles),
                readSplitAnyEntrapmentCode($dataClasses[target._classId], codeTitles),
                readItemsEntrapmentCodeSplitTotal(target.equips(), codeTitles),
                readItemsEntrapmentCodeSplitTotal(target.states(), codeTitles)
            );
        } else if (target.isEnemy()) {
            return result.concat(
                readSplitAnyEntrapmentCode(target.enemy(), codeTitles),
                readItemsEntrapmentCodeSplitTotal(target.states(), codeTitles)
            );
        }
        return result;
    };

    var variablesChangeNoteTags = function (codeTitles, item, target) {
        if (item) variablesChangeItemNoteTags(codeTitles, item);
        if (target) variablesChangeUnitNoteTags(codeTitles, target);
    };

    var variablesChangeItemNoteTags = function (codeTitles, obj) {
        var evalsText = readEntrapmentCodeToText(obj, codeTitles);
        if (!evalsText) return;
        evcEvalsFormula(evalsText.split(';'));
    };

    var variablesChangeUnitNoteTags = function (codeTitles, obj) {
        evcEvalsFormula(readItemsEntrapmentCodeArray(obj, codeTitles));
    };

    var evcEvalsFormula = function (evals) {
        for (var i = 0; i < evals.length; i++) {
            FTKR.evalCalcFormula(evals[i]);
        }
        if ($gameMap) $gameMap.requestRefresh();
    };

    var defaultVariablesChange = function (condition) {
        var eval = FTKR.EVC.default[condition];
        if (eval) {
            evcEvalsFormula(eval.split(';'));
        }
    };

    //=============================================================================
    // 使用時
    //=============================================================================

    var _EVC_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        _EVC_Game_Action_apply.call(this, target);
        this.evcVariablesChange(target);
    };

    Game_Action.prototype.evcVariablesChange = function (target) {
        var result = target.result();
        if (!result.used) return false;
        FTKR.setGameData(this.subject(), target, this.item());
        this.variablesChangeItemNoteTags(['使用時', 'USE'], this.subject());
        defaultVariablesChange('use');
        if (result.isHit()) {
            this.variablesChangeItemNoteTags(['使用成功時', 'SUCCESS'], this.subject());
            defaultVariablesChange('success');
            if (this.killedTargetEnemy(target)) {
                this.variablesChangeItemNoteTags(['討伐時', 'KILL'], this.subject());
                variablesChangeUnitNoteTags(['討伐時', 'KILL'], target)
                defaultVariablesChange('kill');
            }
        } else {
            if (result.evaded) {
                variablesChangeUnitNoteTags(['回避時', 'EVADE'], target);
                defaultVariablesChange('evade');
            }
            this.variablesChangeItemNoteTags(['使用失敗時', 'FAILURE'], this.subject());
            defaultVariablesChange('failure');
        }
        return true;
    };

    Game_Action.prototype.variablesChangeItemNoteTags = function (codeTitles, target) {
        variablesChangeNoteTags(codeTitles, this.item(), target);
    };

    Game_Action.prototype.killedTargetEnemy = function (target) {
        var result = target.result();
        return (result.hpDamage || result.mpDamage) && target.isEnemy() && target.hp <= 0;
    };

    //=============================================================================
    // ダメージ時
    //=============================================================================

    var _EVC_Game_Action_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function (target, value) {
        _EVC_Game_Action_executeDamage.call(this, target, value);
        if (this.isHpEffect() || this.isMpEffect()) {
            FTKR.setGameData(this.subject(), target, this.item());
            this.variablesChangeItemNoteTags(['与ダメージ時', 'DAMAGE'], this.subject());
            defaultVariablesChange('damage');
            variablesChangeUnitNoteTags(['被ダメージ時', 'RECEIVE_DAM'], target);
            defaultVariablesChange('receive');
        }
    };

    //=============================================================================
    // 購入時
    //=============================================================================

    var _EVC_Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function (number) {
        FTKR.setGameData(null, null, this._item, number);
        variablesChangeNoteTags(['購入時', 'BUY'], this._item);
        defaultVariablesChange('buy');
        _EVC_Scene_Shop_doBuy.call(this, number);
    };

    //=============================================================================
    // 増加・減少時
    //=============================================================================

    var _EVC_Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        if (this.itemContainer(item) && amount) {
            FTKR.setGameData(null, null, item, amount);
            if (amount > 0) {
                variablesChangeNoteTags(['増加時', 'GAIN'], item);
                defaultVariablesChange('gain');
            } else if (amount < 0) {
                variablesChangeNoteTags(['減少時', 'LOSE'], item);
                defaultVariablesChange('lose');
            }
        }
        _EVC_Game_Party_gainItem.call(this, item, amount, includeEquip);
    };

    //=============================================================================
    // 売却時
    //=============================================================================

    var _EVC_Scene_Shop_doSell = Scene_Shop.prototype.doSell;
    Scene_Shop.prototype.doSell = function (number) {
        FTKR.setGameData(null, null, this._item, number);
        variablesChangeNoteTags(['売却時', 'SELL'], this._item);
        defaultVariablesChange('sell');
        _EVC_Scene_Shop_doSell.call(this, number);
    };

    //=============================================================================
    // 戦闘終了時
    //=============================================================================

    var _EVC_BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function () {
        this.allBattleMembers().forEach(function (member) {
            FTKR.setGameData(member);
            variablesChangeUnitNoteTags(['勝利時', 'VICTORY'], member);
        });
        FTKR.setGameData();
        defaultVariablesChange('victory');
        _EVC_BattleManager_processVictory.call(this);
    };

    var _EVC_BattleManager_processEscape = BattleManager.processEscape;
    BattleManager.processEscape = function () {
        var success = _EVC_BattleManager_processEscape.call(this);
        if (success) {
            this.allBattleMembers().forEach(function (member) {
                FTKR.setGameData(member);
                variablesChangeUnitNoteTags(['逃走時', 'ESCAPE'], member);
            });
            FTKR.setGameData();
            defaultVariablesChange('escape');
        }
        return success;
    };

    var _EVC_BattleManager_processDefeat = BattleManager.processDefeat;
    BattleManager.processDefeat = function () {
        this.allBattleMembers().forEach(function (member) {
            FTKR.setGameData(member);
            variablesChangeUnitNoteTags(['敗北時', 'DEFEAT'], member);
            defaultVariablesChange('defeat');
        });
        FTKR.setGameData();
        _EVC_BattleManager_processDefeat.call(this);
    };

    var _EVC_BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function (result) {
        _EVC_BattleManager_endBattle.call(this, result);
        this.allBattleMembers().forEach(function (member) {
            FTKR.setGameData(member);
            variablesChangeUnitNoteTags(['戦闘終了時', 'BATTLEEND'], member);
        });
        FTKR.setGameData();
        defaultVariablesChange('end');
    };

}());//EOF