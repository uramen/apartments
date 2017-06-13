import _ from 'lodash';
import winston from 'winston';
import VK from 'vksdk';
import Apartment from '../models/Apartment';

import {rgx} from '../helpers/rgx';
import {ROOMS, PRICE, PHONE, STREET} from '../helpers/regexp.js';

// Configs
const groupsIds = ['ruby_ch'];
const vk        = new VK({
  'appId': 6015096,
  'appSecret': 'lpNkoSBzUFjCtBsYZWpV',
  'language': 'ru'
});

export default {
  start() {
    vk.request('groups.getById', {
      group_ids: groupsIds.join(',')
    }, answer => {
      let res = answer.response;
      if (res) {
        res.map(group => {
          vk.request('wall.get', {
            owner_id: -Math.abs(group.id),
            count: 10
          }, answer => {
            let posts = answer.response.items;

            if (posts) {
              posts.map(post => {
                
                if (
                  post.post_type === 'post' &&
                  post.attachments !== undefined &&
                  post.text !== ''
                ) {
                  
                   Apartment.find({description: post.text}).then(data => {if(data.length === 0) return;});
                   
                  const apartmentObj = new Apartment({
                    title: 'Test Title',
                    type: 'Flat',
                    street: _.get(rgx(STREET).exec(post.text, 0), 'res'),
                    rooms: _.get(rgx(ROOMS).exec(post.text, 0), 'res', '0').replace(/\D/g,''),
                    price: _.get(rgx(PRICE).exec(post.text, 0), 'res', '0').replace(/\D/g,''),
                    number: _.get(rgx(PHONE).exec(post.text, 0), 'res'),
                    vk_profile: post.from_id,
                    description: post.text,
                    images: _.map(post.attachments, P => P.photo["photo_604"]),
                  });
                  

                  apartmentObj.save()
                    .then(() => {
                      console.log('Post successfully saved!');
                    }, err => {
                      // ignore duplicate key error, post_id
                      if (err.code !== 11000) {
                        winston.error(err);
                      }
                    });
                }
              });
            } else {
              winston.log('info', 'answer.response.items was empty');
            }
          });
        });
      }
    });
  }
}
