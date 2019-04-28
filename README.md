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
|user|reference|null:false,foreign_key:true|
|group|reference|null:false,foreign_key:true|

### Association 
belongs_to :users
belongs_to :group


## groupテーブル
|Column|Type|optipn|
|------|----|------|
|name|string|null:falls|

### Association
has_many :messages
has_many :members
has_many :users, through: :members



## membersテーブル
|Column|Type|optipn|
|------|----|------|
|user|reference|null:false,foreign_key:true|
|group|reference|null:false,foreign_key:true|

### Association
belongs_to :users
belongs_to :group