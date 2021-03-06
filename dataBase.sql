PGDMP                         y           acl    13.1    13.1 "    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    41536    acl    DATABASE     `   CREATE DATABASE acl WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE acl;
                postgres    false            �            1259    42239    commentIdSeq    SEQUENCE        CREATE SEQUENCE public."commentIdSeq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 %   DROP SEQUENCE public."commentIdSeq";
       public          postgres    false            �            1259    42234    commentsForPosts    TABLE     8  CREATE TABLE public."commentsForPosts" (
    "commentId" integer DEFAULT nextval('public."commentIdSeq"'::regclass) NOT NULL,
    "userId" integer NOT NULL,
    comment character varying(255) NOT NULL,
    "postId" integer NOT NULL,
    date timestamp with time zone DEFAULT date_trunc('second'::text, now())
);
 &   DROP TABLE public."commentsForPosts";
       public         heap    postgres    false    209            �            1259    42222    friendsIdSeq    SEQUENCE     w   CREATE SEQUENCE public."friendsIdSeq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."friendsIdSeq";
       public          postgres    false            �            1259    42212    friends    TABLE     �   CREATE TABLE public.friends (
    "friendsId" integer DEFAULT nextval('public."friendsIdSeq"'::regclass) NOT NULL,
    "fromUserId" integer NOT NULL,
    "toUserId" integer NOT NULL,
    approve boolean DEFAULT false NOT NULL
);
    DROP TABLE public.friends;
       public         heap    postgres    false    207            �            1259    41537    posts    TABLE       CREATE TABLE public.posts (
    "postId" integer NOT NULL,
    description character varying(2555),
    "userId" integer,
    "postImg" character varying(255),
    available character varying(8),
    date timestamp without time zone DEFAULT date_trunc('second'::text, now())
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    41540    postsPostIdSeq    SEQUENCE     �   CREATE SEQUENCE public."postsPostIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."postsPostIdSeq";
       public          postgres    false    200            �           0    0    postsPostIdSeq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."postsPostIdSeq" OWNED BY public.posts."postId";
          public          postgres    false    201            �            1259    41542    users    TABLE     �  CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "nameUser" character varying(255),
    "emailUser" character varying(255),
    "passwordUser" character varying(255),
    "userToken" character varying(9999),
    permission character varying[],
    "avatarImg" character varying(255),
    phone character varying(13),
    university character varying(99),
    "regType" character varying(6)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    41789    usersInfoAvailableIdSeq    SEQUENCE     �   CREATE SEQUENCE public."usersInfoAvailableIdSeq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;
 0   DROP SEQUENCE public."usersInfoAvailableIdSeq";
       public          postgres    false            �            1259    41776    usersInfoAvailable    TABLE     ^  CREATE TABLE public."usersInfoAvailable" (
    "userinfoId" integer DEFAULT nextval('public."usersInfoAvailableIdSeq"'::regclass) NOT NULL,
    "userId" integer NOT NULL,
    "nameAvailable" character varying(9),
    "emailAvailable" character varying(9),
    "phoneAvailable" character varying(9),
    "universityAvailable" character varying(99)
);
 (   DROP TABLE public."usersInfoAvailable";
       public         heap    postgres    false    205            �            1259    41548    usersUserIdSeq    SEQUENCE     �   CREATE SEQUENCE public."usersUserIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."usersUserIdSeq";
       public          postgres    false    202            �           0    0    usersUserIdSeq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."usersUserIdSeq" OWNED BY public.users."userId";
          public          postgres    false    203            <           2604    41550    posts postId    DEFAULT     n   ALTER TABLE ONLY public.posts ALTER COLUMN "postId" SET DEFAULT nextval('public."postsPostIdSeq"'::regclass);
 =   ALTER TABLE public.posts ALTER COLUMN "postId" DROP DEFAULT;
       public          postgres    false    201    200            >           2604    41551    users userId    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."usersUserIdSeq"'::regclass);
 =   ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
       public          postgres    false    203    202            �          0    42234    commentsForPosts 
   TABLE DATA           \   COPY public."commentsForPosts" ("commentId", "userId", comment, "postId", date) FROM stdin;
    public          postgres    false    208    (       �          0    42212    friends 
   TABLE DATA           Q   COPY public.friends ("friendsId", "fromUserId", "toUserId", approve) FROM stdin;
    public          postgres    false    206   �*       �          0    41537    posts 
   TABLE DATA           \   COPY public.posts ("postId", description, "userId", "postImg", available, date) FROM stdin;
    public          postgres    false    200   /+       �          0    41542    users 
   TABLE DATA           �   COPY public.users ("userId", "nameUser", "emailUser", "passwordUser", "userToken", permission, "avatarImg", phone, university, "regType") FROM stdin;
    public          postgres    false    202   5       �          0    41776    usersInfoAvailable 
   TABLE DATA           �   COPY public."usersInfoAvailable" ("userinfoId", "userId", "nameAvailable", "emailAvailable", "phoneAvailable", "universityAvailable") FROM stdin;
    public          postgres    false    204   8       �           0    0    commentIdSeq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."commentIdSeq"', 775, true);
          public          postgres    false    209            �           0    0    friendsIdSeq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."friendsIdSeq"', 1, false);
          public          postgres    false    207            �           0    0    postsPostIdSeq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."postsPostIdSeq"', 122, true);
          public          postgres    false    201            �           0    0    usersInfoAvailableIdSeq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."usersInfoAvailableIdSeq"', 19, true);
          public          postgres    false    205            �           0    0    usersUserIdSeq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."usersUserIdSeq"', 50, true);
          public          postgres    false    203            M           2606    42238 &   commentsForPosts commentsForPosts_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."commentsForPosts"
    ADD CONSTRAINT "commentsForPosts_pkey" PRIMARY KEY ("commentId");
 T   ALTER TABLE ONLY public."commentsForPosts" DROP CONSTRAINT "commentsForPosts_pkey";
       public            postgres    false    208            K           2606    42218    friends friends_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY ("friendsId");
 >   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_pkey;
       public            postgres    false    206            E           2606    41553    posts posts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY ("postId");
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    200            I           2606    41780 !   usersInfoAvailable user_info_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public."usersInfoAvailable"
    ADD CONSTRAINT user_info_pkey PRIMARY KEY ("userinfoId");
 M   ALTER TABLE ONLY public."usersInfoAvailable" DROP CONSTRAINT user_info_pkey;
       public            postgres    false    204            G           2606    41555    users users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    202            N           2606    42189    usersInfoAvailable fk_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."usersInfoAvailable"
    ADD CONSTRAINT fk_user_id FOREIGN KEY ("userId") REFERENCES public.users("userId") ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."usersInfoAvailable" DROP CONSTRAINT fk_user_id;
       public          postgres    false    2887    202    204            �   �  x��XKo1>;��=!���~��@H\���ٮ�d�d9��c�ֳ��7R�T���yxl+"��}ٿ��������?��Ĥ�L	%��le�2��)�A�U2����nzN=.|8���eF�[!��i*�l�ľ�6^�� �e��]&�0��i��̟<]�tdҳO���xWm428�˟�� h��g�c�~<���t�6b�u�)R�4�kt��/�&dxХX���d�R8&#"���8�i,<S�����@D3/��dI���C�<�_�i����0��C��4<jt�
 e�� +�s��m���H>[G�J9<�	����hUWb�8�t�뵁K��*w���Q�$��U	b�����F��y��Z�B%4�`qdV��"K5s"f:u��^|���k(#���+cr:_KQ�b�$�Y�R�xx�SrZ7��с��Y����D��?�h�6v��:�V������6�iZ6�����	pVR������i�2�3�4Ad��UzRH|Z�X��ր\�1�U%jg��i@���6��x�cޭ���B	|c�x���x���q���(�����/�����I�Rb������6�B"\:]Su�N"B����Ɉ'LT�C�2�G��)8�<�!?��n��F��1�˞���	9���^8A\�q�\R�z���q�փ'�c1,/p��m����~��F#�,�Y>5A�~�����W�:��
ظS*{���f��v�$A      �   0   x�3�4�4�,�2��@�H�p�q�p�X%\�@Y��P�.F��� �k�      �   �	  x��Y[o�}v~�]k�Nf�3�P:-P��΢�}�Z����D#?����4(P �Id��.��>?�6�n��q�����8�N�����ӏǟ���OO�Oǧ����!���eM���Y�f����a^]��-Ec����~�7�mo>�M��?�3�3~0~Z܀���9�Stf��ٛ��~��	�޺�nބ��G�^����Dק�΃u�ƴlvsӟ�Wz���b�'������z?%<�7�h�%�W�K��))?S��9|x8�>�����X��~���"~��B$ƶX$�o���X��V3�&�j\Cj|�"������Ԙ例���ڭx�8�n�ڎጻpm��͟�]K�M�+����%s3><V��'���L����b�(����.��&�[D��jnnܛ���wf�q)�5s�ۇ5����[�O�P��*��6OI.aM�^R�\�A����ӺD;Ma��D�ܭ���#�k������қ��>��S+�ۆ O��'�����BR�wz�S����%_��S�d����a]]���jHmE�p�}W�FnvDI�5{�+֮��6�S@�7�#�צ+�=$���������ҋ�wMߛ/av=�J<h*3:���;����qID��3.j�'Ã)�H�Kk�.�n������u�#tG+�`���,W.0
<�U���Ճw���?�E�V�WH����Tw���?�9�q�s).TjP���m5���*㣀�~��4�g�̘CY�%���b餈oV�hP6a�`R$��_��"��2��&�*<��o.F+*�$A�������fj��Dh��������\	�C�u<i�ܖ�_M���<�Q hf8���� JG��]c����b����d��qeՐ�#��!(��%�Gڒ�X��s��w��9�h�+�^��������� ���"�}:C9-�G��d	�W���SZ�z
����u�;�?���á���߁���b���$ĳ���"��@ZZ�5�].�Xa����g6 T3
��j�6�[si���(��-)v�/fy�x���t��j3��� gK�I��0�1���!X��0�
��#@FF^YJ��5T���9�VK��XL[ĺ4K�@SxeX���(����˃#�8K��1�G�ND��@��Ӯ�B'�d┹�+�iGp��6��(�٣lQ���Y|Kf�_6/"##S˿i>�������kdG}��f���^�y\����J܍L����. >L-��L��;���ހ�3F�L ���D���1�����K#�i첱l�p�k�}@���'dc)+T�P��B� b+"����{�l@��׺�f����^2r�m���"O��4hmZ�%v�]� /�=���L(xqU��.�Dd������Ͽ��%Bb�4�Ȍ��B�I��Ry,4����fX���ɦx702$L�,�ض|�	���y�
.j�
Cd'R_?a�`�ܠJ�|�T�b�a�21$W�R
}�����7 �i.S�ڥ�=���b*�wBT��ٚ���!��>��N�؝K��+�T��mw���,�z[�W�hM��t@!�.��F4A�"ճk�}ύ�����=Y<>�h��})�~g�e��l�`����#Rv�$ם���/XJ�=`^�QV�TD�' �e������>(�,��63��E'�����'_T�UƤ̓r�KH�+A�wF07�b�Z��q�Y!v6o���q��`�P�!|a\�e�0e`�U���2���Ж2E���$�~�7���]�-�p��1�Q��ێV>� O�\ɾz(?�^��ۿ���eϯ�T!�+�������������t<=��J����Z��U�P�de��}r��=R��PWTR5��H����V�W�Կ�����r��O�G��ͬ��r1	y\0k�%`	4ҁ�o/v��ɑ{�b��UOVd������N��gj��@0�t:�] D�N`��;�-}��Bn��R����iBn�q��<��`�=c���eU�znP���Y�)Ɗ/�aJ� ��V}T����*�[|Qm[`4�Oڊ�,��&�83��Qy�iA��ӡw*j�IN����{l�m�|6c�a��-�؎�.��m��W��z����n��d��uo=[������A�	l�X~β��\:^B�6�C�,�H*��i�@�S�R�T��v�&S'�&�w;�o�r2���m$�1����/��G�y�/�(ݓ��ǭ-p�a�j�T�t{$���SP������ۤ��P!{�;��=��㡂�foY�vN�A�gq�J�V��w��A����S~i� ;�k��q,��:������'�<��H�U �8>����Q��������%YYd��-�6 ��.�6�����m"}!��n�-��h�k��9b�:�
�T���Z��?R�_i��5�|�7��cl�����ҞU�������>q��`Ssjy/Fr<�����l���m��ϟ>������}����ZjE{      �   �  x��T[��0}�_��:$��[w�Ph�����@��K���7q/���������p�×#�N�����<Nj������Y��<H��S�^��ܣ�E{5Fr�u�*�AVJ%3�`���p��*�(������1V���j$�(��S|'Y[0ކN[�S\�j��I��)����6�Y����.��lơl?�P4���
np K�p�9&H��wZ�pK�L�-X?���ěj;D9����	�����O�K�5�BkJr�:�!]S,]V��ony��l��E���L���r?�h��9��ډ��1����i�c�{���[�&��lv�S���Ȉ[�;��߬~��m��
#U��dyY��E�f.��|�It㇡5�}�ieg�����/����?�e`�t 7]�[.��Y� ��5^�þ8	d~�wQ9������s�P苃�H�|���I�sk�S���I�3��W{xV��w�ҧ2^��;��**�.���?�ؔ�e1���f1vv�%����-�#A
����c�����k2���٥�5����G�+�l1\�ɦ���1/;����䝧%���FxZ��g�j�E j�%�z�7��V�LE}�n�1!��%�1>ְ2zw�x:s�+��V��j��>WWy�^1���z�Us��[�!Ї@��>���+�5{X�� ps��Hs���R��N����v�      �   F   x�3�44�t��A�\���`�[Qfj^J1\�Ȁ��C��!'PC��·�㟗S����4�SG� t�$�     