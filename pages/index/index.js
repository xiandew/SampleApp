//index.js
//获取应用实例
const app = getApp()
const fs = wx.getFileSystemManager()

const parser = require("../../utils/parser.js");

Page({
        data: {
                motto: 'Hello World',
                userInfo: {},
                hasUserInfo: false,
                canIUse: wx.canIUse('button.open-type.getUserInfo')
        },
        //事件处理函数
        bindViewTap: function() {
                wx.navigateTo({
                        url: '../logs/logs'
                })
        },
        onLoad: function() {
                if (app.globalData.userInfo) {
                        this.setData({
                                userInfo: app.globalData.userInfo,
                                hasUserInfo: true
                        })
                } else if (this.data.canIUse) {
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        app.userInfoReadyCallback = res => {
                                this.setData({
                                        userInfo: res.userInfo,
                                        hasUserInfo: true
                                })
                        }
                } else {
                        // 在没有 open-type=getUserInfo 版本的兼容处理
                        this.getUserInfo()
                }
        },
        getUserInfo: function(e) {
                console.log(e)
                app.globalData.userInfo = e.detail.userInfo
                this.setData({
                        userInfo: e.detail.userInfo,
                        hasUserInfo: true
                })
        },

        uploadFile: function() {
                wx.chooseMessageFile({
                        count: 10,
                        type: 'file',
                        success(res) {
                                // tempFilePath可以作为img标签的src属性显示图片
                                const tempFiles = res.tempFiles
				fs.readFile({
					filePath: tempFiles[0].path,
					encoding: "utf8",
					success: function(res) {
						console.log(parser.parseCSV(res.data));
					},
					fail: function(err) {
						console.log("ERROR: " + err);
					}
				});
                        },
			fail: function (err) {
				console.log(err);
			}
                })
        }

})