import winston from 'winston';
import VK from 'vksdk';
import Apartment from '../models/Apartment';

// Configs
const groupsIds = ['casablanca77', 'pidsluhanochernivtsi'];
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
                  const apartmentObj = new Apartment({
                    title: 'Test Title',
                    type: 'Flat',
                    rooms: 2,
                    price: 200,
                    number: '0953473375',
                    vk_profile: post.from_id,
                    description: post.text,
                    images: post.attachments
                  });

                  apartmentObj.save()
                    .then(() => {
                      console.log('post successfully saved!');
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
