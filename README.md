## usersテーブル
|Column|Type|option|
|------|----|------|
|name|string|null:falls|

### Associatiton
has_many :messages
has_many :members
has_many :groups, through: :members




## messagesテーブル
|Column|Type|optipn|
|------|----|------|
|body|text||
|image|text||
|user|reference|null:falls,foreign_key:true|
|group|reference|null:falls,foreign_key:true|

### Association 
belongs_to :users
belongs_to :group


## groupテーブル
|Column|Type|optipn|
|------|----|------|
|title|string|null:falls|
|user|reference|null:falls,foreign_key:true|
|messages|reference|null:falls,foreign_key:true|

### Association
has_many :messages
has_many :members
has_many :users, through: :members



## membersテーブル
|Column|Type|optipn|
|------|----|------|
|user|reference|null:falls,foreign_key:true|
|group|reference|null:falls,foreign_key:true|

### Association
belongs_to :users
belongs_to :group