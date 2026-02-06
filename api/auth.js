const users=[
  {username:"andi",password:"andi123"},
  {username:"budi",password:"budi123"},
  {username:"caca",password:"caca123"},
  {username:"dedi",password:"dedi123"},
  {username:"eka",password:"eka123"},
  {username:"fajar",password:"fajar123"}
];

export default function handler(req,res){
  const {password}=req.body||{};
  const user=users.find(u=>u.password===password);
  if(!user) return res.status(401).json({success:false});
  res.json({success:true,username:user.username});
}
