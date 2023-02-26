'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230226204947 extends Migration {

  async up() {
    this.addSql('create table "data" ("key" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "value" varchar(255) not null, constraint "data_pkey" primary key ("key"));');

    this.addSql('create table "guild" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "prefix" varchar(255) null, "deleted" boolean not null, "last_interact" timestamptz(0) not null, constraint "guild_pkey" primary key ("id"));');

    this.addSql('create table "image" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "file_name" varchar(255) not null, "base_path" varchar(255) not null default \'\', "url" varchar(255) not null, "size" int not null, "tags" text[] not null, "hash" varchar(255) not null, "delete_hash" varchar(255) not null);');

    this.addSql('create table "pastebin" ("id" varchar(255) not null, "edit_code" varchar(255) not null, "lifetime" int not null, "created_at" timestamptz(0) not null, constraint "pastebin_pkey" primary key ("id"));');

    this.addSql('create table "stat" ("id" serial primary key, "type" varchar(255) not null, "value" varchar(255) not null, "additional_data" jsonb null, "created_at" timestamptz(0) not null);');

    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "last_interact" timestamptz(0) not null, constraint "user_pkey" primary key ("id"));');
  }

  async down() {
    this.addSql('drop table if exists "data" cascade;');

    this.addSql('drop table if exists "guild" cascade;');

    this.addSql('drop table if exists "image" cascade;');

    this.addSql('drop table if exists "pastebin" cascade;');

    this.addSql('drop table if exists "stat" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
exports.Migration20230226204947 = Migration20230226204947;
