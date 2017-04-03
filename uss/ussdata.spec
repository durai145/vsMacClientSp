primitive - this is basic unit of the datatype
constrcitive - this combination of the primitive datatype but it is consider as one element of the schema, it may contain two or more fields .
field is either one of primitive or constrcitive.
Container - this is  one or more fields
collection is array of the container

1,  distructive

	conver the each container/collection into userdefine datatype .djson
	
2. construtive/expand

	expand the userdefine datatype into actual defintion which is defined in .djson files.

	Mapping
	------------------------------
	
	1.mapper  input request to response field mapping and define function for business logics .
	2. business logic is relationship agains the tables.it is noting but a json for each table objects and relationship and it has been generated while converting the sql into mongodb.