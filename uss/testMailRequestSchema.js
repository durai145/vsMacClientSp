
var heaeriesjson = require("./heaeriesjson");
var schemaJson = require("../jsonSchema/outboundMailRequestSchema.json");

console.log(heaeriesjson);


		var dataJson= [
    {
        "outboundMailRequest": [ {
	"headers": {
        "received": [
            "from mail-qk0-f177.google.com (mail-qk0-f177.google.com [209.85.220.177])\n\tby myroomexpense.com (Haraka/2.8.12) with ESMTP id C8803F5B-6F3C-43B0-9AB7-B9CFBCB1B19C.1\n\tenvelope-from <durai145@gmail.com>;\n\tTue, 23 May 2017 00:10:06 +0000\n",
            "by mail-qk0-f177.google.com with SMTP id a72so119316144qkj.2\n        for <jayagopal.govindaraj@myroomexpense.com>; Mon, 22 May 2017 17:10:06 -0700 (PDT)\n",
            "by 10.200.42.241 with HTTP; Mon, 22 May 2017 17:10:04 -0700 (PDT)\n"
        ],
        "dkim-signature": [
            "v=1; a=rsa-sha256; c=relaxed/relaxed;\n        d=gmail.com; s=20161025;\n        h=mime-version:in-reply-to:references:from:date:message-id:subject:to;\n        bh=19GZVMAV+SXZ3kBKKy3pKzSVYvhrsvXfaE52VY2MOoM=;\n        b=Ko/3uiel6D3p9VCXrfIrlErY5bGM8jFi+YQvLDYN7+kKe7vkAwTp75wgPypRzHPUAb\n         v2wvMOCAD8jhA+C2Z4rj7oeUrBYtFYWXHXi4K4gZ7v9W01aAXybSJJm+LBbSyCP9tL1n\n         0Ikx/7UVgSxAl2EJ4Mv5TSU08iWRPRgGds6BtJo56/0jtLMaklL38UWaaLAVZd/STbHh\n         bW8Hes0d3dynqRbzPxXqO+402LX/8LWi0XHCOKfZqdynyiaZjajjXP9vCHVRIYSJn9jI\n         hTJqI746j2XvOlSNJkqW8tyYIFGl9tqi7f1LOCNf5VguZ9RxKA7kS2H5FwGo6zoZ7Rax\n         5c6g==\n"
        ],
        "x-google-dkim-signature": [
            "v=1; a=rsa-sha256; c=relaxed/relaxed;\n        d=1e100.net; s=20161025;\n        h=x-gm-message-state:mime-version:in-reply-to:references:from:date\n         :message-id:subject:to;\n        bh=19GZVMAV+SXZ3kBKKy3pKzSVYvhrsvXfaE52VY2MOoM=;\n        b=FwteYKRDAKU80FzN2MBKGrIYu9p3KhsSqV0oHEIVsqtJVp/Vy1qgYgNWahQHxPRbeA\n         r9WGye1KgkQlDuB+mw1pIYqQI+6hK613AGjX8bMT4SEAMnjeXebwJpZedfxM8snr2fBb\n         A37g+8kvLZZwZDYcfpKffaergQ1TpgdX7DjbkYlCNFNHm+kmonr6XQ1XfbFRFQGMnqty\n         MVgP6zZQNKitMsSDNRXYbRuOvC+naNUewRXl8/hSG40fNbyv1Z107xROs+PuxNqBV+Oz\n         9tQXDp6KwwgDcb7NcP/vbhMlXQjlhDonSc/GL4xFIWeCUbPTmheJepJtfzdPQOb9Cqvv\n         b+/g==\n"
        ],
        "x-gm-message-state": [
            "AODbwcD/MntmP9O/bbMLDGszx1CjPj/lZVtLyEVXTsYXjHpWc2hs4Jxn\n\ttyuzUBwdYxF6YXvFqOrfdPH9ooESRq79\n"
        ],
        "x-received": [
            "by 10.55.116.133 with SMTP id p127mr21588200qkc.154.1495498205342;\n Mon, 22 May 2017 17:10:05 -0700 (PDT)\n"
        ],
        "mime-version": [
            "1.0\n"
        ],
        "in-reply-to": [
            "<CAEeZC=TPb1+ZFk95Cyc2hc1bcxSCFzfYKVkDiqQkhcONngx7gA@mail.gmail.com>\n"
        ],
        "references": [
            "<CAEeZC=S2=sRG11Zq5RA=ePj3D1LGZeZQQSzUHfEYxkybRBa0sQ@mail.gmail.com>\n <CAEeZC=TPb1+ZFk95Cyc2hc1bcxSCFzfYKVkDiqQkhcONngx7gA@mail.gmail.com>\n"
        ],
        "from": [
            "Duraimurugan Govindaraj <durai145@gmail.com>\n"
        ],
        "date": [
            "Mon, 22 May 2017 20:10:04 -0400\n"
        ],
        "message-id": [
            "<CAEeZC=T0wQ61_wFAh3-kHV-V2QFv1cYM_aPdOPpUU6ARiQ_aKg@mail.gmail.com>\n"
        ],
        "subject": [
            "Re: test\n"
        ],
        "to": [
            "jayagopal.govindaraj@myroomexpense.com\n"
        ],
        "content-type": [
            "multipart/alternative; boundary=\"001a114fde724ab090055025cfe2\"\n"
        ]
    },
    "headers_decoded": {
        "received": [
            "from mail-qk0-f177.google.com  by myroomexpense.com (Haraka/2.8.12) with ESMTP id C8803F5B-6F3C-43B0-9AB7-B9CFBCB1B19C.1 envelope-from <durai145@gmail.com>; Tue, 23 May 2017 00:10:06 +0000",
            "by mail-qk0-f177.google.com with SMTP id a72so119316144qkj.2 for <jayagopal.govindaraj@myroomexpense.com>; Mon, 22 May 2017 17:10:06 -0700 ",
            "by 10.200.42.241 with HTTP; Mon, 22 May 2017 17:10:04 -0700 "
        ],
        "dkim-signature": [
            "v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20161025; h=mime-version:in-reply-to:references:from:date:message-id:subject:to; bh=19GZVMAV+SXZ3kBKKy3pKzSVYvhrsvXfaE52VY2MOoM=; b=Ko/3uiel6D3p9VCXrfIrlErY5bGM8jFi+YQvLDYN7+kKe7vkAwTp75wgPypRzHPUAb v2wvMOCAD8jhA+C2Z4rj7oeUrBYtFYWXHXi4K4gZ7v9W01aAXybSJJm+LBbSyCP9tL1n 0Ikx/7UVgSxAl2EJ4Mv5TSU08iWRPRgGds6BtJo56/0jtLMaklL38UWaaLAVZd/STbHh bW8Hes0d3dynqRbzPxXqO+402LX/8LWi0XHCOKfZqdynyiaZjajjXP9vCHVRIYSJn9jI hTJqI746j2XvOlSNJkqW8tyYIFGl9tqi7f1LOCNf5VguZ9RxKA7kS2H5FwGo6zoZ7Rax 5c6g=="
        ],
        "x-google-dkim-signature": [
            "v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:mime-version:in-reply-to:references:from:date :message-id:subject:to; bh=19GZVMAV+SXZ3kBKKy3pKzSVYvhrsvXfaE52VY2MOoM=; b=FwteYKRDAKU80FzN2MBKGrIYu9p3KhsSqV0oHEIVsqtJVp/Vy1qgYgNWahQHxPRbeA r9WGye1KgkQlDuB+mw1pIYqQI+6hK613AGjX8bMT4SEAMnjeXebwJpZedfxM8snr2fBb A37g+8kvLZZwZDYcfpKffaergQ1TpgdX7DjbkYlCNFNHm+kmonr6XQ1XfbFRFQGMnqty MVgP6zZQNKitMsSDNRXYbRuOvC+naNUewRXl8/hSG40fNbyv1Z107xROs+PuxNqBV+Oz 9tQXDp6KwwgDcb7NcP/vbhMlXQjlhDonSc/GL4xFIWeCUbPTmheJepJtfzdPQOb9Cqvv b+/g=="
        ],
        "x-gm-message-state": [
            "AODbwcD/MntmP9O/bbMLDGszx1CjPj/lZVtLyEVXTsYXjHpWc2hs4Jxn tyuzUBwdYxF6YXvFqOrfdPH9ooESRq79"
        ],
        "x-received": [
            "by 10.55.116.133 with SMTP id p127mr21588200qkc.154.1495498205342; Mon, 22 May 2017 17:10:05 -0700 "
        ],
        "mime-version": [
            "1.0"
        ],
        "in-reply-to": [
            "<CAEeZC=TPb1+ZFk95Cyc2hc1bcxSCFzfYKVkDiqQkhcONngx7gA@mail.gmail.com>"
        ],
        "references": [
            "<CAEeZC=S2=sRG11Zq5RA=ePj3D1LGZeZQQSzUHfEYxkybRBa0sQ@mail.gmail.com> <CAEeZC=TPb1+ZFk95Cyc2hc1bcxSCFzfYKVkDiqQkhcONngx7gA@mail.gmail.com>"
        ],
        "from": [
            "Duraimurugan Govindaraj <durai145@gmail.com>"
        ],
        "date": [
            "Mon, 22 May 2017 20:10:04 -0400"
        ],
        "message-id": [
            "<CAEeZC=T0wQ61_wFAh3-kHV-V2QFv1cYM_aPdOPpUU6ARiQ_aKg@mail.gmail.com>"
        ],
        "subject": [
            "Re: test"
        ],
        "to": [
            "jayagopal.govindaraj@myroomexpense.com"
        ],
        "content-type": [
            "multipart/alternative; boundary=\"001a114fde724ab090055025cfe2\""
        ]
    },
    "header_list":  null
/*[
        "Received: from mail-qk0-f177.google.com (mail-qk0-f177.google.com [209.85.220.177])\n\tby myroomexpense.com (Haraka/2.8.12) with ESMTP id C8803F5B-6F3C-43B0-9AB7-B9CFBCB1B19C.1\n\tenvelope-from <durai145@gmail.com>;\n\tTue, 23 May 2017 00:10:06 +0000\n",
        "Received: by mail-qk0-f177.google.com with SMTP id a72so119316144qkj.2\n        for <jayagopal.govindaraj@myroomexpense.com>; Mon, 22 May 2017 17:10:06 -0700 (PDT)\n",
        "DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\n        d=gmail.com; s=20161025;\n        h=mime-version:in-reply-to:references:from:date:message-id:subject:to;\n        bh=19GZVMAV+SXZ3kBKKy3pKzSVYvhrsvXfaE52VY2MOoM=;\n        b=Ko/3uiel6D3p9VCXrfIrlErY5bGM8jFi+YQvLDYN7+kKe7vkAwTp75wgPypRzHPUAb\n         v2wvMOCAD8jhA+C2Z4rj7oeUrBYtFYWXHXi4K4gZ7v9W01aAXybSJJm+LBbSyCP9tL1n\n         0Ikx/7UVgSxAl2EJ4Mv5TSU08iWRPRgGds6BtJo56/0jtLMaklL38UWaaLAVZd/STbHh\n         bW8Hes0d3dynqRbzPxXqO+402LX/8LWi0XHCOKfZqdynyiaZjajjXP9vCHVRIYSJn9jI\n         hTJqI746j2XvOlSNJkqW8tyYIFGl9tqi7f1LOCNf5VguZ9RxKA7kS2H5FwGo6zoZ7Rax\n         5c6g==\n",
        "X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\n        d=1e100.net; s=20161025;\n        h=x-gm-message-state:mime-version:in-reply-to:references:from:date\n         :message-id:subject:to;\n        bh=19GZVMAV+SXZ3kBKKy3pKzSVYvhrsvXfaE52VY2MOoM=;\n        b=FwteYKRDAKU80FzN2MBKGrIYu9p3KhsSqV0oHEIVsqtJVp/Vy1qgYgNWahQHxPRbeA\n         r9WGye1KgkQlDuB+mw1pIYqQI+6hK613AGjX8bMT4SEAMnjeXebwJpZedfxM8snr2fBb\n         A37g+8kvLZZwZDYcfpKffaergQ1TpgdX7DjbkYlCNFNHm+kmonr6XQ1XfbFRFQGMnqty\n         MVgP6zZQNKitMsSDNRXYbRuOvC+naNUewRXl8/hSG40fNbyv1Z107xROs+PuxNqBV+Oz\n         9tQXDp6KwwgDcb7NcP/vbhMlXQjlhDonSc/GL4xFIWeCUbPTmheJepJtfzdPQOb9Cqvv\n         b+/g==\n",
        "X-Gm-Message-State: AODbwcD/MntmP9O/bbMLDGszx1CjPj/lZVtLyEVXTsYXjHpWc2hs4Jxn\n\ttyuzUBwdYxF6YXvFqOrfdPH9ooESRq79\n",
        "X-Received: by 10.55.116.133 with SMTP id p127mr21588200qkc.154.1495498205342;\n Mon, 22 May 2017 17:10:05 -0700 (PDT)\n",
        "MIME-Version: 1.0\n",
        "Received: by 10.200.42.241 with HTTP; Mon, 22 May 2017 17:10:04 -0700 (PDT)\n",
        "In-Reply-To: <CAEeZC=TPb1+ZFk95Cyc2hc1bcxSCFzfYKVkDiqQkhcONngx7gA@mail.gmail.com>\n",
        "References: <CAEeZC=S2=sRG11Zq5RA=ePj3D1LGZeZQQSzUHfEYxkybRBa0sQ@mail.gmail.com>\n <CAEeZC=TPb1+ZFk95Cyc2hc1bcxSCFzfYKVkDiqQkhcONngx7gA@mail.gmail.com>\n",
        "From: Duraimurugan Govindaraj <durai145@gmail.com>\n",
        "Date: Mon, 22 May 2017 20:10:04 -0400\n",
        "Message-ID: <CAEeZC=T0wQ61_wFAh3-kHV-V2QFv1cYM_aPdOPpUU6ARiQ_aKg@mail.gmail.com>\n",
        "Subject: Re: test\n",
        "To: jayagopal.govindaraj@myroomexpense.com\n",
        "Content-Type: multipart/alternative; boundary=\"001a114fde724ab090055025cfe2\"\n"
    ]*/
	}
        ]
    }
];
	
console.log(heaeriesjson.valWithSch(schemaJson, dataJson));


