var mongoose    = require('../../auth/node_modules/mongoose');
var damm        = require('../../auth/node_modules/damm');
var Profile     = require('../../auth/models/profile');
var User        = require('../../auth/models/user');
var async       = require('async');
var crypto      = require('crypto');

mongoose.connect("mongodb://localhost:27017/dacos-auth");

async.series([function (next) {
    console.log('saving profile...');
     Profile.update({'slug' : 'aluno'}, {
        'slug'          : 'aluno',
        'name'          : 'aluno',
        'permissions'   : ["consultas"]
    }, {'upsert' : true}, next);    
}, function (next) {
    console.log('saving user...');
    var query = Profile.findOne();
    query.where('slug', 'aluno');
    query.exec(function (error, profile) {
        async.each(read_file("/data/VidaAcademicaAluno-anon.csv"), function (line, next) {
            damm.generate(line[0]);
            var academicRegistry = damm.append(line[0]);
            User.update({'academicRegistry' : academicRegistry}, {
                'profile'           : profile._id,
                'academicRegistry'  : academicRegistry,
                'password'          : crypto.createHash('sha1').update(academicRegistry + 'ekPhz_}/^^Q13HIHo,_tU1EPItV~ 2-A0d,,W00k0wpT.yHIy1VYtc@p3B-{pMyv').digest('hex')
            }, {'upsert' : true}, next);
        }, next);
    });
}], function (error) {
    if(error) console.error(error);
    process.exit();
});

function read_file(file){
    var fs = require("fs"); 
    var dados = [];
    var texto = fs.readFileSync(__dirname + file, 'UTF-8');
    var linha = texto.split("\n");
    for(var i=1;i<linha.length;i++){
        var valor = linha[i].split(";");
        var tamValor = valor.length;
        if(tamValor > 0){
            valor[tamValor-1] = valor[tamValor-1].slice(0,-1)
            dados.push(valor);
        }
    }
    return dados;
}