//=============================================================================
// パーティー内のパラメータに関するスクリプトを実装するプラグイン
// FTKR_SearchPartyParam.js
// プラグインNo : 15
// 作成者     : フトコロ
// 作成日     : 2017/04/09
// 最終更新日 : 2017/04/14
// バージョン : v1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_SPP = true;

var FTKR = FTKR || {};
FTKR.SPP = FTKR.SPP || {};

//=============================================================================
/*:
@plugindesc v1.0.1 Plugin that implements scripts related to party parameters
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
Implementing this plugin implements scripts related to party parameters and status.

-----------------------------------------------------------------------------
Setup
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager".

-----------------------------------------------------------------------------
What the script can be used for
-----------------------------------------------------------------------------
Change the capitalized script strings to the following depending on what you want to query.

<GROUP>
Replace with the following:
1. Party
$gameParty

2. Troops (*1)
$gameTroop

3. Party and Troops (*2)
$gameMember

(*1) Only available during Battle
(*2) Only available to party members outside of Battle
Note that member IDs overlap between party and Troops,
so when using this function, be sure to also perform a process to determine whether the member is an actor.

<MEMBER>
Replace with the following:
1. All members in the GROUP (*3)
members()

2. Alive members in the GROUP
aliveMembers()

3. Dead members in the GROUP
deadMembers()

(*3) During battle, only members participating in battle are returned.

[Input Example]
Alive members in the party
$gameParty.aliveMembers()

Dead members in the Troops
$gameTroop.deadMembers()

All members in battle, both friendly and enemy
$gameMember.members()

-----------------------------------------------------------------------------
Script Command
-----------------------------------------------------------------------------
<Script for Retrieving Parameter Values>

1. Retrieve the sum of the specified parameter
GROUP.MEMBER.sumParam('param')
: Enter the parameter name (in English) in param.
: Example)
: $gameParty.members().sumParam('trg')
: Retrieves the total target rate for the party.

2. Get the average value of a specified parameter
GROUP.MEMBER.averageParam('param')
: Enter the parameter name (in English) in param.
: Example)
: $gameParty.members().averageParam('hp')
: Gets the average current HP value within the party.

3. Get the maximum value of a specified parameter
GROUP.MEMBER.maxParam('param')
: Enter the parameter name (in English) in param.
: Example)
: $gameParty.members().maxParam('atk')
: Gets the maximum attack power value within the party.

4. Get the minimum value of a specified parameter
GROUP.MEMBER.minParam('param')
: Enter the parameter name (in English) in param.
Example:
$gameParty.members().minParam('hit')
Gets the minimum hit rate within the party.

<Script to get member IDs>

1. Get the member ID with the highest value for a specified parameter.
GROUP.MEMBER.isHighestParam('param')
: Enter the parameter name (in English) in param.
: If there are multiple matching members, the ID of the member who comes first in the sort order will be retrieved.
Example:
$gameParty.members().isHighestParam('atk')
: Gets the actor ID with the highest attack power within the party.

2. Get the member ID with the lowest value for a specified parameter.
GROUP.MEMBER.isLowestParam('param')
: Enter the parameter name (in English) in param.
: If there are multiple matching members, the ID of the member who comes first in the sort order will be retrieved.
Example:
$gameParty.members().isLowestParam('atk')
Gets the ID of the actor with the lowest attack power in the party.

3. Gets the ID of the member wearing the specified equipment.
GROUP.MEMBER.isEquipped(equip)
GROUP.MEMBER.isEquippedWeapon(weaponId)
GROUP.MEMBER.isEquippedArmor(armorId)
:For 'equip', enter '$dataWeapons[weaponId]' for weapons.
:For armor, enter '$dataArmors[armorId]'.
:If there is no matching member, returns false.
:If there are multiple matching members, gets the ID of the member who is ahead in the order.
Example:
$gameParty.members().isEquipped($dataWeapons[10])
$gameParty.members().isEquippedWeapon(10)
Retrieves the IDs of actors in the party equipped with weapon ID 10.

4. Retrieves the IDs of members who have learned a specified skill.
GROUP.MEMBER.isLearnedSkill(x)
: Enter the skill ID in x.
: Returns false if no matching member exists.
: If multiple matching members exist, retrieves the ID of the member who comes first in the list.
Example:
$gameParty.members().isLearnedSkill(5)
: Retrieves the IDs of actors in the party who have learned skill ID 5.

5. Retrieves the IDs of members who have been granted a specified state.
GROUP.MEMBER.isStateAffected(x)
: Enter the state ID in x.
: Returns false if no match is found.
: If multiple matched members exist, retrieves the ID of the member who is in front of them in the order.
: Example)
: $gameParty.members().isStateAffected(5)
: Retrieves the ID of the actor in the party with state ID 5.

6. Randomly select a surviving member and retrieve that member's data.
GROUP.randomTarget()
: Add the following to the end of this script to retrieve various values.
: Example)
: 1. Determine if the target is an actor.
: GROUP.randomTarget().isActor()
: 2. Retrieve the ID.
: GROUP.randomTarget().memberId()

7. Randomly select a defunct member and retrieve that member's data.
GROUP.randomDeadTarget()
: Same usage as GROUP.randomTarget() in 6.

<Script to get a list of member IDs>

1. Get a list (array) of IDs of members whose specified parameter exceeds a certain value.
GROUP.MEMBER.isHigherParam('param', x)
: Enter the parameter name (in alphabetical characters) in param.
: Enter the test value in x.
: Note that members with a parameter equal to x will not be counted.
: If there are no matching members, an empty array will be returned.
: Example)
: $gameParty.members().isHigherParam('atk', 100)
: Get a list of IDs of actors in the party whose attack power exceeds 100.
: Advanced)
: $gameParty.members().isHigherParam('atk', 100).length
: Get the number of actors in the party whose attack power exceeds 100.

2. Get a list (array) of IDs of members whose specified parameter is below a certain value.
GROUP.MEMBER.isLowerParam('param', x)
: Enter the parameter name (in alphabetical characters) in param.
: Enter the judgment value in x.
: Note that members with a parameter equal to x are not counted.
: If there are no matching members, an empty array is returned.
: Example)
: $gameParty.members().isLowerParam('atk', 100)
: Get a list of IDs of actors in the party whose attack power is below 100.
: Advanced)
: $gameParty.members().isLowerParam('atk', 100).length
: Get the number of actors in the party whose attack power is below 100.

-----------------------------------------------------------------------------
License for this plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php

----------------------------------------------------------------------------
Change History
----------------------------------------------------------------------------

v1.0.1 - 2017/04/14: Bug fixes, script additions, help revisions
1. Fixed a bug where an error occurred when using isLowerParam() and isHigherParam() on enemies.

v1.0.0 - 2017/04/09: First version released

-----------------------------------------------------------------------------
*/

/*:ja
@plugindesc v1.0.1 パーティー内のパラメータに関するスクリプトを実装するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、パーティー内のパラメータや状態に関する
スクリプトを実装します。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。


-----------------------------------------------------------------------------
スクリプトを使用できる対象
-----------------------------------------------------------------------------
スクリプトの大文字で記述している文字列は、調べたい対象によって以下の記述に
変更してください。

＜GROUP＞
以下の記述に置き換えます。
1. パーティー
   $gameParty

2. 敵グループ(*1)
   $gameTroop

3. パーティーと敵グループ(*2)
   $gameMember

(*1) 戦闘中のみ使えます
(*2) 戦闘中以外はパーティーのみになります
     なお、パーティーと敵グループでメンバーのIDが被るため
     使用時には、アクターかどうか判定する処理も合わせて実行してください。


＜MEMBER＞
以下の記述に置き換えます。
1. GROUP内のすべてのメンバー(*3)
   members()

2. GROUP内の生存メンバー
   aliveMembers()

3. GROUP内の戦闘不能メンバー
   deadMembers()

(*3) 戦闘中はバトルに参加しているメンバーのみ


[入力例]
パーティー内の生存しているメンバー
$gameParty.aliveMembers()

敵グループ内の戦闘不能メンバー
$gameTroop.deadMembers()

敵味方含む戦闘中のすべてのメンバー
$gameMember.members()


-----------------------------------------------------------------------------
スクリプトコマンド
-----------------------------------------------------------------------------
＜パラメータの値を取得するスクリプト＞

1. 指定したパラメータの合計値を取得する
GROUP.MEMBER.sumParam('param')
   :param には パラメータ名(英字) を入力してください。
   :例)
   : $gameParty.members().sumParam('trg')
   : パーティー内の狙われ率の合計値を取得する。

2. 指定したパラメータの平均値を取得する
GROUP.MEMBER.averageParam('param')
   :param には パラメータ名(英字) を入力してください。
   :例)
   : $gameParty.members().averageParam('hp')
   : パーティー内の現在HPの平均値を取得する。

3. 指定したパラメータの最大値を取得する
GROUP.MEMBER.maxParam('param')
   :param には パラメータ名(英字) を入力してください。
   :例)
   : $gameParty.members().maxParam('atk')
   : パーティー内の攻撃力の最大値を取得する。

4. 指定したパラメータの最小値を取得する
GROUP.MEMBER.minParam('param')
   :param には パラメータ名(英字) を入力してください。
   :例)
   : $gameParty.members().minParam('hit')
   : パーティー内の命中率の最小値を取得する。


＜メンバーのIDを取得するスクリプト＞

1. 指定したパラメータの最大値を持つメンバーIDを取得する
GROUP.MEMBER.isHighestParam('param')
   :param には パラメータ名(英字) を入力してください。
   :該当者が複数いる場合は、並び順で前にいるメンバーのIDを取得します。
   :例)
   : $gameParty.members().isHighestParam('atk')
   : パーティー内で最大の攻撃力を持つアクターのIDを取得する。

2. 指定したパラメータの最小値を持つメンバーIDを取得する
GROUP.MEMBER.isLowestParam('param')
   :param には パラメータ名(英字) を入力してください。
   :該当者が複数いる場合は、並び順で前にいるメンバーのIDを取得します。
   :例)
   : $gameParty.members().isLowestParam('atk')
   : パーティー内で最小の攻撃力を持つアクターのIDを取得する。

3. 指定した装備をしているメンバーのIDを取得する
GROUP.MEMBER.isEquipped(equip)
GROUP.MEMBER.isEquippedWeapon(weaponId)
GROUP.MEMBER.isEquippedArmor(armorId)
   :'equip' には 武器なら '$dataWeapons[weaponId]'
   :防具なら '$dataArmors[armorId]' を入力してください。
   :該当者がいない場合は、false を返します。
   :該当者が複数いる場合は、並び順で前にいるメンバーのIDを取得します。
   :例)
   : $gameParty.members().isEquipped($dataWeapons[10])
   : $gameParty.members().isEquippedWeapon(10)
   : パーティー内で武器ID10 の装備を持つアクターのIDを取得する。

4. 指定したスキルを習得しているメンバーのIDを取得する
GROUP.MEMBER.isLearnedSkill(x)
   :x には スキルIDを入力してください。
   :該当者がいない場合は、false を返します。
   :該当者が複数いる場合は、並び順で前にいるメンバーのIDを取得します。
   :例)
   : $gameParty.members().isLearnedSkill(5)
   : パーティー内でスキルID5 のスキルを習得しているアクターのIDを取得する。

5. 指定したステートを付与されているメンバーのIDを取得する
GROUP.MEMBER.isStateAffected(x)
   :x には ステートIDを入力してください。
   :該当者がいない場合は、false を返します。
   :該当者が複数いる場合は、並び順で前にいるメンバーのIDを取得します。
   :例)
   : $gameParty.members().isStateAffected(5)
   : パーティー内でステートID5 のステートを付与されているアクターの
   : IDを取得する。

6. 生存メンバーの中からランダムに一人選んで、そのメンバーのデータを取得する
GROUP.randomTarget()
   :このスクリプトの末尾に以下を加えると、いろいろな値を取得できます。
   :例)
   :1. アクターかどうか判定する
   : GROUP.randomTarget().isActor()
   :2. IDを取得する
   : GROUP.randomTarget().memberId()

7. 戦闘不能メンバーの中からランダムに一人選んで、そのメンバーのデータを取得する
GROUP.randomDeadTarget()
   :6 の GROUP.randomTarget() と使い方は同じです。


＜メンバーのIDのリストを取得するスクリプト＞

1. 指定したパラメータが一定値を超えるメンバーのIDリスト(配列)を取得する
GROUP.MEMBER.isHigherParam('param', x)
   :param には パラメータ名(英字) を入力してください。
   :x には判定値を入力してください。
   :なお、x と等しいパラメータを持つメンバーは数えません。
   :該当者がいない場合は、空の配列を取得します。
   :例)
   : $gameParty.members().isHigherParam('atk', 100)
   : パーティー内で攻撃力が 100 を超えるアクターのIDリストを取得する。
   :応用)
   : $gameParty.members().isHigherParam('atk', 100).length
   : パーティー内で攻撃力が 100 を超えるアクターの人数を取得する。

2. 指定したパラメータが一定値を下回るメンバーのIDリスト(配列)を取得する
GROUP.MEMBER.isLowerParam('param', x)
   :param には パラメータ名(英字) を入力してください。
   :x には判定値を入力してください。
   :なお、x と等しいパラメータを持つメンバーは数えません。
   :該当者がいない場合は、空の配列を取得します。
   :例)
   : $gameParty.members().isLowerParam('atk', 100)
   : パーティー内で攻撃力が 100 未満のアクターのIDリストを取得する。
   :応用)
   : $gameParty.members().isLowerParam('atk', 100).length
   : パーティー内で攻撃力が 100 未満のアクターの人数を取得する。


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

v1.0.1 - 2017/04/14 : 不具合修正、スクリプト追加、ヘルプ修正
   1. isLowerParam()とisHigherParam()をエネミーに使うとエラーになる
      不具合を修正。

v1.0.0 - 2017/04/09 : 初版公開

-----------------------------------------------------------------------------
*/

//=============================================================================


//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.SPP.parameters = PluginManager.parameters('FTKR_SearchPartyParam');

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

Array.prototype.sumParam = function (parameter) {
    return this.reduce(function (r, member) {
        return r + member[parameter];
    }, 0);
};

Array.prototype.averageParam = function (parameter) {
    return this.length ? this.sumParam(parameter) / this.length : 0;
};

Array.prototype.maxParam = function (parameter) {
    return this.length ? Math.max.apply(null, this.map(function (member) {
        return member[parameter];
    })) : 0;
};

Array.prototype.minParam = function (parameter) {
    return this.length ? Math.min.apply(null, this.map(function (member) {
        return member[parameter];
    })) : 0;
};

Array.prototype.ishasParam = function (parameter, param) {
    var target = this.find(function (member) {
        return member[parameter] === param;
    });
    return target ? target.memberId() : false;
};

Array.prototype.isHighestParam = function (parameter) {
    return this.ishasParam(parameter, this.maxParam(parameter));
};

Array.prototype.isLowestParam = function (parameter) {
    return this.ishasParam(parameter, this.minParam(parameter));
};

Array.prototype.isMemberId = function () {
    return this.map(function (member) {
        return member ? member.memberId() : null;
    });
};

Array.prototype.isHigherParam = function (parameter, param) {
    var members = this.filter(function (member) {
        return member[parameter] > param;
    });
    return members.isMemberId();
};

Array.prototype.isLowerParam = function (parameter, param) {
    var members = this.filter(function (member) {
        return member[parameter] < param;
    });
    return members.isMemberId();
};

Array.prototype.isStateAffected = function (stateId) {
    var target = this.find(function (member) {
        return member && member.isStateAffected(stateId);
    });
    return target ? target.memberId() : false;
};

Array.prototype.isEquipped = function (item) {
    var target = this.find(function (actor) {
        return actor && actor.isActor() && actor.equips().contains(item);
    });
    return target ? target.memberId() : false;
};

Array.prototype.isEquippedWeapon = function (itemId) {
    return this.isEquipped($dataWeapons[itemId]);
};

Array.prototype.isEquippedArmor = function (itemId) {
    return this.isEquipped($dataArmors[itemId]);
};

Array.prototype.isLearnedSkill = function (skillId) {
    var target = this.find(function (actor) {
        return actor && actor.isActor() && actor.isLearnedSkill(skillId);
    });
    return target ? target.memberId() : false;
};

//=============================================================================
// DataManager
//=============================================================================

FTKR.SPP.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
    FTKR.SPP.DataManager_createGameObjects.call(this);
    $gameMember = new Game_Member();
};

//=============================================================================
// Game_Member
//=============================================================================

function Game_Member() {
    this.initialize.apply(this, arguments);
}

Game_Member.prototype.initialize = function () {
    this._data = [];
};

Game_Member.prototype.members = function () {
    return $gameParty.inBattle() ?
        $gameParty.members().concat($gameTroop.members()) :
        $gameParty.members();
};

Game_Member.prototype.aliveMembers = function () {
    return $gameParty.inBattle() ?
        $gameParty.aliveMembers().concat($gameTroop.aliveMembers()) :
        $gameParty.aliveMembers();
};

Game_Member.prototype.deadMembers = function () {
    return $gameParty.inBattle() ?
        $gameParty.deadMembers().concat($gameTroop.deadMembers()) :
        $gameParty.deadMembers();
};

Game_Member.prototype.movableMembers = function () {
    return $gameParty.inBattle() ?
        $gameParty.movableMembers().concat($gameTroop.movableMembers()) :
        $gameParty.movableMembers();
};

Game_Member.prototype.randomTarget = function () {
    var members = this.aliveMembers();
    var tgrRand = Math.random() * members.sumParam('tgr');
    var target = null;
    members.forEach(function (member) {
        tgrRand -= member.tgr;
        if (tgrRand <= 0 && !target) {
            target = member;
        }
    });
    return target;
};

Game_Member.prototype.randomDeadTarget = function () {
    var members = this.deadMembers();
    if (members.length === 0) {
        return null;
    }
    return members[Math.floor(Math.random() * members.length)];
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.memberId = function () {
    return this.actorId();
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.memberId = function () {
    return this.enemyId();
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.memberId = function (member) {
    return member !== undefined ? member.memberId() : false;
};

Game_Unit.prototype.averageParam = function (parameter) {
    var members = this.members();
    if (members.length === 0) {
        return 1;
    }
    var sum = members.reduce(function (r, member) {
        return r + member[parameter];
    }, 0);
    return sum / members.length;
};

Game_Unit.prototype.maxParam = function (parameter) {
    return Math.max.apply(null, this.members().map(function (member) {
        return member[parameter];
    }));
};

Game_Unit.prototype.isHighestParam = function (parameter) {
    var param = Math.max.apply(null, this.members().map(function (member) {
        return member[parameter];
    }));
    return this.members().find(function (member) {
        return member[parameter] === param;
    }).memberId();
};

Game_Unit.prototype.isHigherParam = function (parameter, param) {
    var members = this.members().filter(function (member) {
        return member[parameter] > param;
    });
    return members.map(function (member) {
        return member ? member.memberId() : null;
    });
};

Game_Unit.prototype.minParam = function (parameter) {
    return Math.min.apply(null, this.members().map(function (member) {
        return member[parameter];
    }));
};

Game_Unit.prototype.isLowestParam = function (parameter) {
    var param = Math.min.apply(null, this.members().map(function (member) {
        return member[parameter];
    }));
    return this.members().find(function (member) {
        return member[parameter] === param;
    }).memberId();
};

Game_Unit.prototype.isLowerParam = function (parameter, param) {
    var members = this.members().filter(function (member) {
        return member[parameter] < param;
    });
    return members.map(function (member) {
        return member ? member.memberId() : null;
    });
};

Game_Unit.prototype.isStateAffected = function (stateId) {
    return this.memberId(this.members().find(function (member) {
        return member.isStateAffected(stateId);
    }));
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.isEquipped = function (item) {
    return this.memberId(this.members().find(function (actor) {
        return actor.equips().contains(item);
    }));
};

Game_Party.prototype.isLearnedSkill = function (skillId) {
    return this.memberId(this.members().find(function (actor) {
        return actor.isLearnedSkill(skillId);
    }));
};