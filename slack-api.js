// Write your package code here!
SlackAPI = {
  // base api call
  _apiCall: async function (method, params, callback) {
    callback = typeof callback !== "undefined" ? callback : false;

    try {
      // Extract token for Authorization header
      const token = params.token;
      const otherParams = { ...params };
      delete otherParams.token;

      // Build URL
      const url = `https://slack.com/api/${method}`;

      // Set up headers with Bearer token and JSON content type
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(otherParams),
      });
      const data = await response.json();

      if (callback) {
        if (!data.ok) {
          return callback(data);
        } else {
          return callback(null, data);
        }
      } else {
        return data;
      }
    } catch (err) {
      if (callback) {
        return callback(err);
      } else {
        throw err;
      }
    }
  },

  // api
  api: {
    test: async function (params, callback) {
      return await SlackAPI._apiCall("api.test", params, callback);
    },
  },

  // auth
  auth: {
    test: async function (token, callback) {
      var params = {
        token: token,
      };

      return await SlackAPI._apiCall("auth.test", params, callback);
    },
  },

  // channels
  channels: {
    archive: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("channels.archive", params, callback);
    },
    create: async function (token, name, callback) {
      var params = {
        token: token,
        name: name,
      };
      return await SlackAPI._apiCall("channels.create", params, callback);
    },
    history: async function (
      token,
      channel,
      latest,
      oldest,
      inclusive,
      count,
      callback,
    ) {
      var time = Date.now();
      latest = typeof latest !== "undefined" ? latest : time;
      oldest = typeof oldest !== "undefined" ? oldest : 0;
      inclusive = typeof inclusive !== "undefined" ? inclusive : 0;
      count = typeof count !== "undefined" ? count : 100;
      var params = {
        token: token,
        channel: channel,
        latest: latest,
        oldest: oldest,
        inclusive: inclusive,
        count: count,
      };
      return await SlackAPI._apiCall("channels.history", params, callback);
    },
    info: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("channels.info", params, callback);
    },
    invite: async function (token, channel, user, callback) {
      var params = {
        token: token,
        channel: channel,
        user: user,
      };
      return await SlackAPI._apiCall("channels.invite", params, callback);
    },
    join: async function (token, name, callback) {
      var params = {
        token: token,
        name: name,
      };
      return await SlackAPI._apiCall("channels.join", params, callback);
    },
    kick: async function (token, channel, user, callback) {
      var params = {
        token: token,
        channel: channel,
        user: user,
      };
      return await SlackAPI._apiCall("channels.kick", params, callback);
    },
    leave: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("channels.leave", params, callback);
    },
    list: async function (accessToken, callback) {
      var params = {
        token: accessToken,
      };
      return await SlackAPI._apiCall("channels.list", params, callback);
    },
    mark: async function (token, channel, ts, callback) {
      var params = {
        token: token,
        channel: channel,
        ts: ts,
      };
      return await SlackAPI._apiCall("channels.mark", params, callback);
    },
    rename: async function (token, channel, name, callback) {
      var params = {
        token: token,
        channel: channel,
        name: name,
      };
      return await SlackAPI._apiCall("channels.rename", params, callback);
    },
    setPurpose: async function (token, channel, purpose, callback) {
      var params = {
        token: token,
        channel: channel,
        purpose: purpose,
      };
      return await SlackAPI._apiCall("channels.setPurpose", params, callback);
    },
    setTopic: async function (token, channel, topic, callback) {
      var params = {
        token: token,
        channel: channel,
        topic: topic,
      };
      return await SlackAPI._apiCall("channels.setTopic", params, callback);
    },
    unarchive: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("channels.unarchive", params, callback);
    },
  },

  // chat
  chat: {
    delete: async function (token, ts, channel, callback) {
      var params = {
        token: token,
        ts: ts,
        channel: channel,
      };
      return await SlackAPI._apiCall("chat.delete", params, callback);
    },
    postMessage: async function (
      accessToken,
      channelId,
      message,
      options,
      callback,
    ) {
      var params = {
        token: accessToken,
        channel: channelId,
        text: message,
      };
      // List of possible options fields in options.
      var optionsList = [
        "parse",
        "attachments",
        "link_names",
        "unfurl_links",
        "username",
        "icon_url",
        "icon_emoji",
        "blocks",
        "mrkdwn",
        "reply_broadcast",
        "thread_ts",
        "unfurl_media",
      ];
      // Append relevant params from options.
      optionsList.forEach(function (opt) {
        if (options[opt] !== undefined) {
          if (opt === "attachments" || opt === "blocks") {
            options[opt] = JSON.stringify(options[opt]); // JSON-encoded array of attachment hashes
          }
          params[opt] = options[opt];
        }
      });
      return await SlackAPI._apiCall("chat.postMessage", params, callback);
    },
    update: async function (token, ts, channel, text, callback) {
      var params = {
        token: token,
        ts: ts,
        channel: channel,
        text: text,
      };
      return await SlackAPI._apiCall("chat.update", params, callback);
    },
  },

  // emoji
  emoji: {
    list: async function (token, callback) {
      var params = {
        token: token,
      };
      return await SlackAPI._apiCall("emoji.list", params, callback);
    },
  },

  // files
  files: {
    delete: async function (token, file, callback) {
      var params = {
        token: token,
        file: file,
      };
      return await SlackAPI._apiCall("files.delete", params, callback);
    },
    info: async function (token, file, count, page, callback) {
      count = typeof count !== "undefined" ? count : 100;
      page = typeof page !== "undefined" ? page : 1;
      var params = {
        token: token,
        file: file,
        count: count,
        page: page,
      };
      return await SlackAPI._apiCall("files.info", params, callback);
    },
    list: async function (
      token,
      user,
      ts_from,
      ts_to,
      types,
      count,
      page,
      callback,
    ) {
      var time = Date.now();
      user = typeof user !== "undefined" ? user : "";
      ts_from = typeof ts_from !== "undefined" ? ts_from : 0;
      ts_to = typeof ts_to !== "undefined" ? ts_to : time;
      types = typeof types !== "undefined" ? types : "all";
      count = typeof count !== "undefined" ? count : 100;
      page = typeof page !== "undefined" ? page : 1;
      var params = {
        token: token,
        user: user,
        ts_from: ts_from,
        ts_to: ts_to,
        types: types,
        count: count,
        page: page,
      };
      return await SlackAPI._apiCall("files.list", params, callback);
    },
    upload: async function (
      token,
      file,
      content,
      filetype,
      filename,
      title,
      initial_comment,
      channels,
      callback,
    ) {
      file = typeof file !== "undefined" ? file : "";
      content = typeof content !== "undefined" ? content : "";
      filetype = typeof filetype !== "undefined" ? filetype : "";
      filename = typeof filename !== "undefined" ? filename : "";
      title = typeof title !== "undefined" ? title : "";
      channels = typeof channels !== "undefined" ? channels : "";
      initial_comment =
        typeof initial_comment !== "undefined" ? initial_comment : "";
      var params = {
        token: token,
        file: file,
        content: content,
        filetype: filetype,
        filename: filename,
        title: title,
        initial_comment: initial_comment,
        channels: channels,
      };
      return await SlackAPI._apiCall("files.upload", params, callback);
    },
  },

  // groups
  groups: {
    archive: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("groups.archive", params, callback);
    },
    close: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("groups.close", params, callback);
    },
    create: async function (token, name, callback) {
      var params = {
        token: token,
        name: name,
      };
      return await SlackAPI._apiCall("groups.create", params, callback);
    },
    createChild: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("groups.createChild", params, callback);
    },
    history: async function (
      token,
      channel,
      latest,
      oldest,
      inclusive,
      count,
      callback,
    ) {
      var time = Date.now();
      latest = typeof latest !== "undefined" ? latest : time;
      oldest = typeof oldest !== "undefined" ? oldest : 0;
      inclusive = typeof inclusive !== "undefined" ? inclusive : 0;
      count = typeof count !== "undefined" ? count : 100;
      var params = {
        token: token,
        channel: channel,
        latest: latest,
        oldest: oldest,
        inclusive: inclusive,
        count: count,
      };
      return await SlackAPI._apiCall("groups.history", params, callback);
    },
    info: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("groups.info", params, callback);
    },
    invite: async function (token, channel, user, callback) {
      var params = {
        token: token,
        channel: channel,
        user: user,
      };
      return await SlackAPI._apiCall("groups.invite", params, callback);
    },
    kick: async function (token, channel, user, callback) {
      var params = {
        token: token,
        channel: channel,
        user: user,
      };
      return await SlackAPI._apiCall("groups.kick", params, callback);
    },
    leave: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("groups.leave", params, callback);
    },
    list: async function (token, exclude_archived, callback) {
      exclude_archived =
        typeof exclude_archived !== "undefined" ? exclude_archived : 0;
      var params = {
        token: token,
        exclude_archived: exclude_archived,
      };
      return await SlackAPI._apiCall("groups.list", params, callback);
    },
    mark: async function (token, channel, ts, callback) {
      var params = {
        token: token,
        channel: channel,
        ts: ts,
      };
      return await SlackAPI._apiCall("groups.mark", params, callback);
    },
    open: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("groups.open", params, callback);
    },
    rename: async function (token, channel, name, callback) {
      var params = {
        token: token,
        channel: channel,
        name: name,
      };
      return await SlackAPI._apiCall("groups.rename", params, callback);
    },
    setPurpose: async function (token, channel, purpose, callback) {
      var params = {
        token: token,
        channel: channel,
        purpose: purpose,
      };
      return await SlackAPI._apiCall("groups.setPurpose", params, callback);
    },
    setTopic: async function (token, channel, topic, callback) {
      var params = {
        token: token,
        channel: channel,
        topic: topic,
      };
      return await SlackAPI._apiCall("groups.setTopic", params, callback);
    },
    unarchive: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("groups.unarchive", params, callback);
    },
  },

  // im
  im: {
    close: async function (token, channel, callback) {
      var params = {
        token: token,
        channel: channel,
      };
      return await SlackAPI._apiCall("im.close", params, callback);
    },
    history: async function (accessToken, channelId, callback) {
      var params = {
        token: accessToken,
        channel: channelId,
      };
      return await SlackAPI._apiCall("im.history", params, callback);
    },
    list: async function (accessToken, callback) {
      var params = {
        token: accessToken,
      };
      return await SlackAPI._apiCall("im.list", params, callback);
    },
    mark: async function (token, channel, ts, callback) {
      var params = {
        token: token,
        channel: channel,
        ts: ts,
      };
      return await SlackAPI._apiCall("im.mark", params, callback);
    },
    open: async function (accessToken, userId, callback) {
      var params = {
        token: accessToken,
        user: userId,
      };
      return await SlackAPI._apiCall("im.open", params, callback);
    },
  },

  // OAuth
  oauth: {
    access: async function (
      client_id,
      client_secret,
      code,
      redirect_uri,
      callback,
    ) {
      var params = {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
        redirect_uri: redirect_uri,
      };
      return await SlackAPI._apiCall("oauth.access", params, callback);
    },
  },

  // rtm
  rtm: {
    start: async function (token, callback) {
      var params = {
        token: token,
      };
      return await SlackAPI._apiCall("rtm.start", params, callback);
    },
  },

  // search
  search: {
    all: async function (
      token,
      query,
      sort,
      sort_dir,
      highlight,
      count,
      page,
      callback,
    ) {
      var params = {
        token: token,
        query: query,
        sort: sort,
        sort_dir: sort_dir,
        highlight: highlight,
        count: count,
        page: page,
      };
      return await SlackAPI._apiCall("search.all", params, callback);
    },
    files: async function (
      token,
      query,
      sort,
      sort_dir,
      highlight,
      count,
      page,
      callback,
    ) {
      var params = {
        token: token,
        query: query,
        sort: sort,
        sort_dir: sort_dir,
        highlight: highlight,
        count: count,
        page: page,
      };
      return await SlackAPI._apiCall("search.files", params, callback);
    },
    messages: async function (
      token,
      query,
      sort,
      sort_dir,
      highlight,
      count,
      page,
      callback,
    ) {
      var params = {
        token: token,
        query: query,
        sort: sort,
        sort_dir: sort_dir,
        highlight: highlight,
        count: count,
        page: page,
      };
      return await SlackAPI._apiCall("search.messages", params, callback);
    },
  },

  // stars
  stars: {
    list: async function (token, user, count, page, callback) {
      user = typeof user !== "undefined" ? user : "";
      count = typeof count !== "undefined" ? count : 100;
      page = typeof page !== "undefined" ? page : 1;
      var params = {
        token: token,
        user: user,
        count: count,
        page: page,
      };
      return await SlackAPI._apiCall("stars.list", params, callback);
    },
  },

  // team
  team: {
    accessLogs: async function (token, count, page, callback) {
      count = typeof count !== "undefined" ? count : 100;
      page = typeof page !== "undefined" ? page : 1;
      var params = {
        token: token,
        count: count,
        page: page,
      };
      return await SlackAPI._apiCall("team.accessLogs", params, callback);
    },
    info: async function (token, callback) {
      var params = {
        token: token,
      };
      return await SlackAPI._apiCall("team.info", params, callback);
    },
  },

  //users
  users: {
    admin: {
      invite: async function (token, email, channels, callback) {
        var params = {
          token: token,
          email: email,
          channels: channels,
        };
        return await SlackAPI._apiCall("users.admin.invite", params, callback);
      },
      setInactive: async function (token, userId, callback) {
        var params = {
          token: token,
          user: userId,
        };
        return await SlackAPI._apiCall(
          "users.admin.setInactive",
          params,
          callback,
        );
      },
      setRegular: async function (token, userId, callback) {
        var params = {
          token: token,
          user: userId,
        };
        return await SlackAPI._apiCall(
          "users.admin.setRegular",
          params,
          callback,
        );
      },
    },
    getPresence: async function (token, callback) {
      var params = {
        token: token,
      };
      return await SlackAPI._apiCall("users.getPresence", params, callback);
    },
    info: async function (token, userId, callback) {
      var params = {
        token: token,
        user: userId,
      };
      return await SlackAPI._apiCall("users.info", params, callback);
    },
    list: async function (token, callback) {
      var params = {
        token: token,
      };
      return await SlackAPI._apiCall("users.list", params, callback);
    },
    setActive: async function (token, callback) {
      var params = {
        token: token,
      };
      return await SlackAPI._apiCall("users.setActive", params, callback);
    },
    setPresence: async function (token, presence, callback) {
      var params = {
        token: token,
        presence: presence,
      };
      return await SlackAPI._apiCall("users.setPresence", params, callback);
    },
  },
};
