import { BasePlugin, ZonetkPlugin, config } from "zonetk-core";
import * as IoRedis from "ioredis";
import * as _ from "lodash";

export default class RedisPlugin extends BasePlugin implements ZonetkPlugin<IoRedis.Redis | IoRedis.Cluster>{

  @config("redis")
  redisConfig

  private redis: IoRedis.Redis | IoRedis.Cluster;
  constructor() {
    super()
    if (_.isArray(this.redisConfig)) {
      this.redis = new IoRedis.Cluster(this.redisConfig)
    } else {
      this.redis = new IoRedis(this.redisConfig);
    }
  }
  resolve() {
    return this.redis;
  }
}