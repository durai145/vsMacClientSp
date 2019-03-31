DIR=$HOME/counter
mkdir -p $DIR
agrc=$#
seqName=default
if [ ! "$agrc"  -le 0 ] 
then 
#{ 
#	echo "WARNING: There is no argument, sequence name is used default"
#}
#else 
#{
	seqName=$1
#}
fi
fileName=$DIR/$seqName
count=0
if [  -f $fileName ] 
then
#{
	count=$(cat  $fileName)
	count=`expr $count + 1`
#}
#else
#{
#	echo "initilize count"
#}
fi

echo "$count" > $fileName
#return $count
echo $count
exit 0
