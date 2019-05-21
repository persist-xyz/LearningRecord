创建数据库 use mall

查看所有数据库  show dbs

刚创建的数据库 mall 并不在数据库的列表中， 要显示它，我们需要向 mall 数据库插入一些数据

db.mall.insert({'name': 'just test'})



查看当前数据库名 db

查看所有数据库  show dbs



删除数据库  db.mall.drop()



在mall数据库中创建 user集合

db.createCollection('user')



查看已有集合，可以使用 **show collections** 或 **show tables** 命令





