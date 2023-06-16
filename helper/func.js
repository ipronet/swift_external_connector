module.exports = {
    list_to_tree: (list) => {
      var map = {},
        node,
        roots = [],
        i;
  
      for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
      }
  
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.baseId !== "0") {
          // if you have dangling branches check that map[node.baseId] exists
          list[map[node.baseId]]?.children.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    },
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
  },
  readFile: async(src_dir,txtdoc)=>{
    const fs = require("fs");
    let filePath  =  src_dir+txtdoc
    console.log(filePath);
    try {
      if(!fs.existsSync(filePath))
    {
      console.log(src_dir,txtdoc);
      return {Status:0,Message:'file does not exist'}
    }
      const data = await fs.promises.readFile(filePath, 'utf8')
      return {Status:1,Data:data}
    }
    catch(err) {
      console.log(err)
      console.log('file not readable');
      return {Status:0,Message:'file not readable'}
    }
  },
  SendMail: async(reciever,message,text="Swift",subject,cc,sender,fileName,filePath,host,port)=>{
   console.log('im here');
   const nodemailer = require("nodemailer");

   const transporter = nodemailer.createTransport

   ({
          service:"Gmail",
           host: "mail.sesalabs.net",

           port: 465,

           secure: true,
          connectionTimeout:1*60*100,
           auth:

           {

               user:"swfitalerts@sesalabs.net",

               pass:"ARhNtp9$H;3R"

           },

           tls: {

               // do not fail on invalid certs

               rejectUnauthorized: false,

           }

   });  



  

   // send mail with defined transport object

   const mailOptions = {

     from: 'swfitalerts@sesalabs.net',

     to: 'richardwilliam60@gmail.com',

     cc: 'timghansah@gmail.com',

     subject: 'desire',

     text: 'dont quit',

   };

  
  console.log('dont quit');
   const info = await transporter.sendMail(mailOptions);
   console.log(info);
  console.log('send func');
  return true

    // let mailOptions = {
      
    //   from: sender, // sender address
    //   to: reciever, // list of receivers
    //   cc,
    //   subject, // Subject line
    //   text, // plain text body
    //   html: message, // html body
    //   attachments: [
    //     // {
    //     //   filename: `${yesterdayDate}Elevy.csv`,
    //     //   path: `./${yesterdayDate}Elevy.csv`,
    //     // },
    //   ],
    //   auth:{
    //     user: 'dzifa@gashie.net',
    //     pass: '123456'
    //   },
    //   tls: { 
    //     rejectUnauthorized: true 
    // }
    // };
    // let transporter = nodemailer.createTransport({
    //   host,
    //   port,
    // });

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log('error dey',error);
    //     return  {Status:0,Message:'Email Push failed'}
    //   }
    //   console.log("Message sent: %s", info.messageId);
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    //   console.log("contact", { msg: "Email has been sent" });
    //   return  {Status:1,Message:'Email has been sent" '}
    // });
    // transporter.verify(function (error, success) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Server is ready to take our messages");
    //   }
    // });
  },
  SendSms: async(phone,content)=>{
    let config = {
      method: 'post',
      url: 'smsUrl',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : 'data'
    };
 
    let response = await axios(config);
    return response
  },
  formatBytes:(bytes, decimals = 2)=>{
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  };
  