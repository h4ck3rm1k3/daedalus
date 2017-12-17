# daedalus

Daedalus - cryptocurrency wallet debian build instructions

These are my build instructions for Debian GNU/Linux, removed all notes about windows and mac osx.
I am running the electron client on my laptop and the backend and middleware on my build server (debian-build-speed) that you see mentioned. The two ports needed are port forwarded via ssh.

## hot mode vs cold mode

If the electron is started with the HOT=1 env variable, the middleware server is loaded from localhost, otherwise the scripts are loaded from dist. The branch hothack https://github.com/h4ck3rm1k3/daedalus/compare/hothack?expand=1 removes those checks to resolve 

## Components

There are two parts to the wallet, the electron front end and the node js middleware that listens on port 4000, and there is the Backend node.
### nvm 
see  https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-ubuntu-12-04-lts/

    apt-get update

    apt-get install build-essential libssl-dev

    curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
    
We need v6 to work

    nvm install v6
    nvm use v6
    
### Install Node.js dependencies.

```bash
$ npm install

### Front end 

The front end runs in chromium and talks to localhost using a tool called [electron](https://electron.atom.io) 

```bash
$ npm run start-hot
This in turn starts 
```

### Middleware

The middleware can be built 
```bash
$ npm install
```

```bash
$ npm run hot-server
```

### Port forwarding
The middleware can run on a local server with no front end, but it will need to be modified to listen on an ip address, it 
listens by default to localhost only. 

If your middleware is running on another machine, in my case `debian-build-speed` you will need to port forward the connection

    ssh -L 4000:localhost:4000 -L 8090:localhost:8090 debian-build-speed

### Backend port 8090
Build the backend 
https://github.com/input-output-hk/cardano-sl/blob/master/docs/how-to/build-cardano-sl-and-daedalus-from-source-code.md

    git checkout cardano-sl-1.0

    [nix-shell:~/cardano-sl]$ ./scripts/build/cardano-sl.sh 
    
Start the backend :

    ./connect-to-mainnet


## Open Issues
https://utopian.io/utopian-io/@h4ck3rm1k3st33m/uncaught-syntaxerror-unexpected-end-of-json-input

