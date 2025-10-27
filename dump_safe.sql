--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: jacobzakaria
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO jacobzakaria;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: jacobzakaria
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO jacobzakaria;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: jacobzakaria
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE drizzle.__drizzle_migrations_id_seq OWNER TO jacobzakaria;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: jacobzakaria
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: account; Type: TABLE; Schema: public; Owner: jacobzakaria
--

CREATE TABLE public.account (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public.account OWNER TO jacobzakaria;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: jacobzakaria
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title character varying(250),
    image text NOT NULL,
    category character varying(100),
    date timestamp without time zone DEFAULT now() NOT NULL,
    "imageCredit" character varying(250) NOT NULL,
    story text NOT NULL,
    tags text[] DEFAULT '{}'::text[],
    images text[] DEFAULT '{}'::text[],
    author character varying(250),
    owner_id text,
    views integer DEFAULT 0
);


ALTER TABLE public.articles OWNER TO jacobzakaria;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: jacobzakaria
--

ALTER TABLE public.articles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: authenticator; Type: TABLE; Schema: public; Owner: jacobzakaria
--

CREATE TABLE public.authenticator (
    "credentialID" text NOT NULL,
    "userId" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "credentialPublicKey" text NOT NULL,
    counter integer NOT NULL,
    "credentialDeviceType" text NOT NULL,
    "credentialBackedUp" boolean NOT NULL,
    transports text
);


ALTER TABLE public.authenticator OWNER TO jacobzakaria;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: jacobzakaria
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    comment text,
    post_id integer,
    owner_id text,
    date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.comments OWNER TO jacobzakaria;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: jacobzakaria
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO jacobzakaria;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jacobzakaria
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: readlist; Type: TABLE; Schema: public; Owner: jacobzakaria
--

CREATE TABLE public.readlist (
    id integer NOT NULL,
    "articleId" integer,
    owner_id text
);


ALTER TABLE public.readlist OWNER TO jacobzakaria;

--
-- Name: readList_id_seq; Type: SEQUENCE; Schema: public; Owner: jacobzakaria
--

CREATE SEQUENCE public."readList_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."readList_id_seq" OWNER TO jacobzakaria;

--
-- Name: readList_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jacobzakaria
--

ALTER SEQUENCE public."readList_id_seq" OWNED BY public.readlist.id;


--
-- Name: replies; Type: TABLE; Schema: public; Owner: jacobzakaria
--

CREATE TABLE public.replies (
    id integer NOT NULL,
    reply text,
    comment_id integer,
    owner_id integer
);


ALTER TABLE public.replies OWNER TO jacobzakaria;

--
-- Name: replies_id_seq; Type: SEQUENCE; Schema: public; Owner: jacobzakaria
--

ALTER TABLE public.replies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.replies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: jacobzakaria
--

CREATE TABLE public.session (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO jacobzakaria;

--
-- Name: users; Type: TABLE; Schema: public; Owner: jacobzakaria
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp without time zone,
    "isAdmin" boolean DEFAULT false,
    image text
);


ALTER TABLE public.users OWNER TO jacobzakaria;

--
-- Name: verificationToken; Type: TABLE; Schema: public; Owner: jacobzakaria
--

CREATE TABLE public."verificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp without time zone NOT NULL
);


ALTER TABLE public."verificationToken" OWNER TO jacobzakaria;

--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: jacobzakaria
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: readlist id; Type: DEFAULT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.readlist ALTER COLUMN id SET DEFAULT nextval('public."readList_id_seq"'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: jacobzakaria
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
\.


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: jacobzakaria
--

COPY public.account ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
c05281fe-7615-4d3b-9348-fe938d0aa673	oidc	google	104921001382252101048	1//REDACTED_TOKEN	ya29.REDACTED_TOKEN	1757906291	bearer	https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email	REDACTED_TOKEN.REDACTED_TOKEN.REDACTED_TOKEN	\N
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: jacobzakaria
--

COPY public.articles (id, title, image, category, date, "imageCredit", story, tags, images, author, owner_id, views) FROM stdin;
57	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/31e96694-98c0-43da-c66e-f74e6c090100/newsafrika	politics	2025-10-22 19:13:13.507744	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/dbf82818-a26c-47d3-fe3c-ba87fbeff200/public,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/6efa135c-ee0f-41a8-cffd-3da19eb65c00/newsafrika}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
58	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/1f2a9e26-2b1c-4dc4-7f47-59edd03c1300/public	politics	2025-10-22 19:13:13.523882	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/a6cbf090-9ed6-4f2c-332d-ff9d57394a00/newsafrika,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/8d1090d3-b0a8-4114-f12a-d3f363898500/newsafrika}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
59	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/6167c3ea-7910-4773-11ee-6599a8f04600/newsafrika	politics	2025-10-22 19:13:13.526628	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/7bd7b9b4-7f62-474a-c947-45af64d48200/newsafrika,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/adc06c80-8bb0-4b5d-c638-d3073a444f00/newsafrika}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
60	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/80f4f4d9-873a-4bb2-cbc4-a80d05371a00/public	politics	2025-10-22 19:13:13.528728	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/08f5a7e7-3e70-4372-cc0f-80db90736300/newsafrika,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/b1809c31-99ce-44a3-af9e-5c60e0971f00/newsafrika}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
61	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/a4751e7c-b5d7-464d-7192-88d8b5bff700/public	politics	2025-10-22 19:13:13.539593	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/68f07f0f-b9d2-44fd-79b3-d8f5e6660a00/public,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/2d7c55d0-7264-46ca-1a5c-cb3fefc9b900/newsafrika}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
62	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/07234fc2-1d9c-4c69-9b94-13bb1f347200/newsafrika	politics	2025-10-22 19:13:13.555717	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/5dc9d5c8-52a8-4d72-ebc7-29a75e3bfd00/newsafrika,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/0c0245db-a296-44c8-17b9-961ccdae4b00/public}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
63	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/a342149c-a7d9-433c-7de2-17dbedc07e00/public	politics	2025-10-22 19:13:13.563599	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/5a4e7ae1-bb71-42b6-2d75-ad526d31c400/newsafrika,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/1fdb9cb2-8400-49f3-3bc7-87932aeed900/public}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
64	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/a3e1c46b-55db-4d6c-a5a0-fb6169ef3000/public	politics	2025-10-22 19:13:13.568602	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/39ffa5ed-7558-4b52-5962-a62e600bf900/public,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/01e6f8b9-3531-4f65-2021-6404c70ba800/public}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
65	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/b1e76d24-7c72-40ba-f5dd-0fcab92f8d00/newsafrika	politics	2025-10-22 19:13:13.576017	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/641ef527-1959-4f56-b696-dd0d96036100/public,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/376923dc-f472-49b8-a246-55e93ba22300/public}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
66	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/5d3443c0-b7b7-4fa4-dd10-60a5dde59a00/public	politics	2025-10-22 19:13:13.581718	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/a25a139c-c10b-45b5-f4bd-43d11884b800/public,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/5c97c2cd-2df0-4789-0946-cd673eb35100/newsafrika}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
67	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/968ad6f5-e183-451c-31a3-48cccfcd5000/public	politics	2025-10-22 19:13:13.592148	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/3d5ab033-c18d-4e67-5086-e962ad40fe00/newsafrika,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/09d40c8b-cfa6-4725-a75d-fec4e7049100/public}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
68	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/611a27f5-3e65-4c45-5b9b-7583a72de700/newsafrika	politics	2025-10-22 19:13:14.094911	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/cd3822cc-a6a9-4a50-c673-73f5d3ee7900/public,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/32a271a3-34e3-4475-2631-80a21b563b00/newsafrika}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
83	Amazon’s delivery glasses: The newest innovation designed to enhance the delivery experience	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/d4cdf399-c1b4-47e1-f9c6-c3ede3ec2400/newsafrika	technology	2025-10-24 04:02:17.456676	Geekwire	[{"children":[{"text":"Every day, DAs connect millions of customers with their packages, navigating neighborhoods with precision and care. Our goal is to continually explore new and ","fontFamily":"__AmazonEmber_5ad93c","fontSize":"1.125rem","color":"rgb(47, 48, 51)","backgroundColor":"rgb(255, 255, 255)"},{"target":"_self","type":"a","url":"https://www.aboutamazon.com/news/operations/REDACTED_TOKEN","children":[{"text":"innovative ways","fontFamily":"__AmazonEmber_5ad93c","fontSize":"16px","color":"rgb(0, 0, 0)","underline":true,"backgroundColor":"rgb(255, 255, 255)"}],"id":"2KeA8jZGbt"},{"text":" that can make their experience as safe and seamless as possible.Since we launched the ","fontFamily":"__AmazonEmber_5ad93c","fontSize":"1.125rem","color":"rgb(47, 48, 51)","backgroundColor":"rgb(255, 255, 255)"},{"target":"_self","type":"a","url":"https://www.aboutamazon.com/news/policy-news-views/amazon-dsp-program-update","children":[{"text":"Delivery Service Partner program","fontFamily":"__AmazonEmber_5ad93c","fontSize":"16px","color":"rgb(0, 0, 0)","underline":true,"backgroundColor":"rgb(255, 255, 255)"}],"id":"d5S-ZM1cBp"},{"text":" in 2018, we’ve used technology to support the DA experience, whether that’s in ","fontFamily":"__AmazonEmber_5ad93c","fontSize":"1.125rem","color":"rgb(47, 48, 51)","backgroundColor":"rgb(255, 255, 255)"},{"target":"_self","type":"a","url":"https://www.aboutamazon.com/news/transportation/amazon-safety-training-delivery-driver","children":[{"text":"dedicated simulation training","fontFamily":"__AmazonEmber_5ad93c","fontSize":"16px","color":"rgb(0, 0, 0)","underline":true,"backgroundColor":"rgb(255, 255, 255)"}],"id":"GlpZaxLkpn"},{"text":" to prepare them for real-world delivery experiences, investments in package handling processes, or improved navigation. We’ve built an entire system of technology to support drivers throughout the end-to-end delivery journey.","fontFamily":"__AmazonEmber_5ad93c","fontSize":"1.125rem","color":"rgb(47, 48, 51)","backgroundColor":"rgb(255, 255, 255)"}],"type":"p","id":"sWocWlCV5k"},{"type":"p","id":"XZS38nT5rf","children":[{"text":"Now, Amazon is adding to that system by introducing smart delivery glasses—wearable technology that makes the DA experience even safer and more seamless. Designed specifically for DAs, these glasses help them scan packages, follow turn-by-turn walking directions, and capture proof of delivery—all without the use of their phone. The glasses create a hands-free experience, reducing the need to look between the phone, the package, and the surrounding area.","fontFamily":"__AmazonEmber_5ad93c","fontSize":"18px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(47, 48, 51)"}]},{"type":"h2","lineHeight":"2.25rem","align":"start","children":[{"text":"Technology at work: AI and machine learning make deliveries safer and more intuitive"}],"id":"JT4m9WMGiA"},{"type":"p","id":"cEBzExqCdY","children":[{"text":"Amazon’s smart glasses leverage ","fontFamily":"__AmazonEmber_5ad93c","fontSize":"18px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(47, 48, 51)"},{"target":"_self","type":"a","url":"https://www.aboutamazon.com/artificial-intelligence-ai-news","children":[{"text":"AI-powered","fontFamily":"__AmazonEmber_5ad93c","fontSize":"1.125rem","color":"rgb(0, 82, 118)","underline":true}],"id":"uWYR5ElMsH"},{"text":" sensing capabilities and computer vision, along with cameras to create a heads-up display that includes everything from navigation details to hazards to delivery tasks. When drivers safely park at a delivery location, the glasses automatically activate and the DA is given their delivery information—right in their field of view—starting with locating the right packages inside their vehicles to the corresponding homes.","fontFamily":"__AmazonEmber_5ad93c","fontSize":"18px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(47, 48, 51)"}]},{"children":[{"text":""}],"type":"p","id":"b_gNn1aI4C"}]	{tech,glasses}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
69	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/0e83cfe0-50e7-415a-2117-a887bf5a6d00/newsafrika	politics	2025-10-22 19:13:14.115539	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/21ea72a2-e0f2-4f3e-8770-b9f98df14800/public,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/d5de3d42-d8a2-4c2c-25da-83f17760dc00/public}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
70	Dissension in the ranks: Some, but not all, federal law enforcement employees are getting paychecks this week	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/62eb239e-fceb-4add-cbf4-c26ae7956a00/newsafrika	politics	2025-10-22 19:13:14.213703	istock	[{"children":[{"text":"The Trump administration’s move to issue paychecks this week to some but not all federal law enforcement employees during the government shutdown is sowing division in the ranks and does little to resolve the harm being done to ongoing investigations, current and former law enforcement officials tell CNN.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"bprOzpzd1c"},{"type":"p","id":"vdAlbKfV30","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"Under special accommodations from the Trump administration, agencies are providing paychecks on schedule to criminal investigative agents, including those who work for Justice Department agencies such as the FBI and Bureau of Alcohol, Tobacco, Firearms and Explosives, and at the US Secret Service, which is part of the Homeland Security department."}]},{"type":"p","id":"GkrGPcFKpe","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"But intelligence analysts and support staff at those agencies won’t be receiving their paychecks during the shutdown. The administration is limiting the paychecks to those categorized as 1811 employees, a reference to the code used for the White House’s budget office for criminal investigative agents."}]},{"type":"blockquote","id":"QeZX2D_Rkd","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"You can imagine what that is doing to morale,” one current senior federal law enforcement official told CNN. “Our intelligence analysts are doing crucial work; without them cases don’t get made. So, to do this doesn’t send the right message."}]},{"children":[{"text":"Dan Brunner, a retired FBI agent who worked through a previous government shutdown says that paying only agents and not analysts and other staff will damage morale.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"6lboPUWgJw"},{"type":"p","id":"13_RIjF5uf","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"The White House hasn’t said how they’re funding the paychecks for these criminal investigative agents."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"The impact is made worse because during the shutdown, investigators are limited in spending money on certain investigative activities."}],"id":"EztF2Efyka"}]	{FBI,security,investigation}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/305a5e0e-d461-4759-8b3f-36ace127ba00/newsafrika,https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/8fa609a9-fece-424b-b3de-86d98ee46f00/newsafrika}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
71	‘It’s a failure’: Seattle Mariners feel the deep pain of disappointment after narrowly missing out on first World Series	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/71cc491d-0f7d-4d98-e16f-5afd5a9c9d00/public	sports	2025-10-24 01:57:44.907357	CNN	[{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"For the "},{"target":"_blank","type":"a","url":"https://cnn.com/2025/10/18/sport/REDACTED_TOKEN","children":[{"text":"Seattle Mariners","underline":true}],"id":"SA6FsBLX3N"},{"text":", the wait goes on. One game away from reaching a first World Series in franchise history, Seattle fell heartbreakingly short in Monday’s 4-3 "},{"target":"_blank","type":"a","url":"https://cnn.com/2025/10/20/sport/REDACTED_TOKEN","children":[{"text":"defeat","underline":true}],"id":"OHZUHpjvdH"},{"text":" ","underline":true},{"text":"against the Toronto Blue Jays."}],"id":"al40Xt_RLK"},{"type":"p","lineHeight":"32px","align":"start","id":"QiCxkf_-Ss","children":[{"text":"The gut-wrenching loss ensures that the Mariners’ unwanted record as the only team in Major League Baseball never to appear at the Fall Classic remains very much intact. To see how much this moment pained Seattle and its players, look no further than MVP candidate ","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"},{"target":"_blank","type":"a","url":"https://www.cnn.com/2025/10/08/sport/baseball-mlb-cal-raleigh-home-run-fan","children":[{"text":"Cal Raleigh"}],"id":"o7UbPPNBBV"},{"text":", who was reduced to tears at the end of the game.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}]},{"type":"blockquote","lineHeight":"32px","align":"start","id":"b3GC1vTYFP","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"I love every guy in this room, but ultimately, it’s not what we wanted,"}]},{"children":[{"text":"On several occasions during this year’s American League Championship Series (ALCS), the signs looked so promising for the Mariners. They jumped into a 2-0 series lead, then went 3-2 up after victory in Game 5.","fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)"}],"type":"p","id":"3eF0e0S-bF"},{"type":"p","id":"fcbGdrPhdj","children":[{"fontFamily":"noto_serif, Georgia, \\"Times New Roman\\", serif","fontSize":"18px","color":"rgb(12, 12, 12)","text":"And in the winner-takes-all game at Toronto’s Rodgers Centre, Seattle went 3-1 ahead when Raleigh launched his fifth home run of the postseason and fourth against the Blue Jays, putting his team in control of the contest at the top of the fifth."}]},{"type":"p","lineHeight":"32px","align":"start","children":[{"text":"That, however, would be the high point of a miserable night for the Mariners. George Springer’s three-run homer saw Toronto move ahead in the seventh inning, and with that, Seattle’s hopes evaporated. Having never in their 49-season history been so close to appearing at the World Series, right now, it might feel like the Mariners have never been further away."}],"id":"KYxcbm30LB"},{"children":[{"text":""}],"type":"p","id":"5hb9rKc8RK"}]	{sports,men,baseball,ball}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/57e18031-8bbb-41ea-9e35-b9670bbe9700/newsafrika}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
72	Another new era for Forest dawns under Dyche	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/22c49095-b61f-48a0-d9c4-4b728ae8d100/newsafrika	sports	2025-10-24 02:15:29.568729	BBC	[{"children":[{"text":"Sean Dyche stood on the touchline and savoured the moment.","fontFamily":"ReithSans, Helvetica, Arial, freesans, sans-serif","fontSize":"16px","backgroundColor":"rgb(246, 246, 246)","color":"rgb(20, 20, 20)","bold":true}],"type":"p","id":"XPLQlTryJz"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"As the Nottingham Forest fans belted out Mull of Kintyre, their new manager looked around the City Ground to take it in. Paul McCartney's song has been Nottingham Forest's anthem since 1978 after its release in 1977, as the club charged to the First Division title under Brian Clough."}],"id":"RmbrdDQVVP"},{"type":"p","lineHeight":"inherit","align":"start","id":"jy6W1RtLcx","children":[{"text":"But after penalties from Morgan Gibbs-White and Igor Jesus earned Forest their first win since their Premier League opener, what else will be in the memory from Dyche's first game in charge?","fontFamily":"ReithSans, Helvetica, Arial, freesans, sans-serif","fontSize":"16px","backgroundColor":"rgb(246, 246, 246)","color":"rgb(20, 20, 20)"}]},{"type":"h2","lineHeight":"1.125","align":"start","children":[{"text":"What did Nottingham Forest look like?","fontFamily":"inherit","fontSize":"inherit"}],"id":"_uzs6Mehuv"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"Without the injured Chris Wood, who has been nursing a knee injury, his manager was robbed of his most potent weapon."}],"id":"sj-1UCW9tt"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"The striker scored 53 goals for Dyche at Burnley and despite his struggles this season, scoring just three times, still represents Forest's biggest threat."}],"id":"HYtGiZcu9f"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"Jesus replaced Taiwo Awoniyi and dropped deep to cause problems for Porto, pulling them out of position, before scoring his third Europa League goal to seal the game from the spot."}],"id":"7gpp14PwyM"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"Dyche moved to a back four, with centre-backs Murillo and Nikola Milenkovic more comfortable, especially with Elliot Anderson and Douglas Luiz sitting in front of them in midfield."}],"id":"87Udx33dx7"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"Anderson was his usual energetic, all-action self, which allowed Gibbs-White more freedom going forward, flanked by Callum Hudson-Odoi and Dan Ndoye."}],"id":"bKVlURs31B"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"The widemen were utilised often, even if their end product was lacking at times."}],"id":"SbJuEr0GYA"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"Around £120m worth of summer signings in James McAtee, Omari Hutchinson, Dilane Bakwa and Arnaud Kalimuendo was left out of the squad on Saturday and Dyche recalled McAtee and Kalimuendo to the bench."}],"id":"bgfmY9i5ex"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"Hutchinson, Forest's £37.5m record signing, was not included in the European squad while Bakwa was injured."}],"id":"CS-gptKCPd"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"Forest can perhaps slip back into their old ways under Nuno Espirito Santo - compact, counter-attacking and more pragmatic - quicker than adapting to the high press, high-tempo style Ange Postecoglou wanted to employ."}],"id":"ovjmThuKhV"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"It certainly looked easier, with more fight, spirit and courage shown than under Postecoglou. The Australian could be forgiven for wondering where it was while he was in charge."}],"id":"IaDPzRtDjH"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"It ultimately earned Forest a first clean sheet in 21 matches, since a 1-0 win over Manchester United in April."}],"id":"lcLg8KNafc"},{"children":[{"text":""}],"type":"p","id":"rRVLvpL7QY"}]	{sports,stadium,men,captain,team,players}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
73	Messi signs new deal with Inter Miami to keep Argentina star in MLS to 2028	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/5b8a214e-a09c-4ab3-42c8-961ef7303800/public	sports	2025-10-24 02:25:20.148353	BBC	[{"children":[{"text":"Lionel Messi has agreed to a contract extension with Inter Miami that will see the Argentine superstar remain in Major League Soccer (MLS) until the end of the 2028 season, the club has confirmed.","fontFamily":"Georgia, Times, \\"Times New Roman\\", serif","fontSize":"20px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(0, 0, 0)"}],"type":"p","id":"0fzpigWvyz"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"The World Cup-winner’s current contract expires at the end of the 2025 MLS season."}],"id":"PgzPOk2Esk"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"A new deal had been viewed as a formality after club sources told AFP last month that the franchise had reached an agreement on an extension."}],"id":"9Z590JL-2E"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Messi’s contract ensures he will remain in competitive action until and long after the 2026 World Cup hosted by the United States, Canada and Mexico."}],"id":"mUIDgERvve"},{"type":"p","lineHeight":"1.5","align":"left","id":"V3VW2Vzwj7","children":[{"text":"Messi moved to Inter Miami in 2023 after an unhappy spell at Paris Saint-Germain and has since had a transformative effect on the league, driving record attendances and ticketing revenues.","fontFamily":"Georgia, Times, \\"Times New Roman\\", serif","fontSize":"20px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(0, 0, 0)"}]},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Messi spent the bulk of his stellar career at Barcelona, where he played from 2004 to 2021 after coming through the Spanish giants’ youth system."}],"id":"VlkT9zzn3E"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"At Barcelona, he won the La Liga title 10 times and lifted the UEFA Champions League trophy on four occasions."}],"id":"J6W3Jp0nj2"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"In 2022, he led Argentina to World Cup glory in Qatar and has expressed a desire to try to retain the trophy next year."}],"id":"uqZBLzXaBF"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"He has scored 114 international goals and also won the Copa America twice with Argentina, in 2021 and 2024."}],"id":"KGz1FA_Tw6"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Messi could play at a sixth World Cup next year, which would set a new all-time record, although he could be matched by longtime rival Cristiano Ronaldo of Portugal."}],"id":"g8ZqWoGY89"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"The eight-time Ballon d’Or winner is also just three goals short of Miroslav Klose’s record of 16 career World Cup goals."}],"id":"foNnuabxkQ"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Argentina comfortably booked a spot at next year’s finals, finishing nine points clear at the top of the South American qualifying table."}],"id":"HVkmO0NKRZ"}]	{MLS,sports,men,soccer}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
74	Tesla recalls 130,000 EVs for touch screen malfunctions	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/34e7704a-ba98-4659-c259-e21f335ad300/public	business	2025-10-24 02:40:17.227839	Aljezeera	[{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Tesla is recalling about 130,000 vehicles across its United States model lineup because their touch screens can overheat and go blank."}],"id":"_YWBhmIL2L"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"The recalls covers certain Model S sedan and Model X SUVs from 2021 and 2022, as well as Model 3 cars and Model Y SUVs from 2022."}],"id":"Tse2ezxzfi"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Documents posted Tuesday by the National Highway Traffic Safety Administration (NHTSA) say that during the fast-charging process, the central processing computers may not cool sufficiently. That can cause the computer to lag or restart, making the centre screen run slowly or appear blank."}],"id":"rCFIWI69Qf"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Without the centre screen, the cars can lose rearview camera displays, settings that control windshield defrosters and indicators that say whether the cars are in drive, neutral or reverse. That can increase the risk of a crash."}],"id":"rjTOT06Xnh"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Tesla is fixing the problem with online software updates that will improve temperature management for the computer. Updates began on May 3."}],"id":"bkMNwaGATq"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Tesla says that it found the problem in routine endurance testing. The company has no reports of crashes or injuries, but it received 59 related warranty claims from January to early May."}],"id":"0mxWmUKcpC"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Tesla has had a spate of safety problems this year, including multiple investigations opened by NHTSA, the nation’s road safety watchdog. The recall is the 11th for the electric vehicle (EV) company since January 27. Most recalls were fixed with software updates."}],"id":"KEYLum4Wee"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Early in 2021 the Austin, Texas, company recalled about 135,000 vehicles, also because the touch screens could go dark. Initially, the company had refused to do a recall. The agency said the screens’ computer processors have a finite number of programme-and-erase cycles and didn’t last long enough. The company agreed to replace the computer processors."}],"id":"KijyGaoJKp"}]	{CEO,wealth,billionaire,founder}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
75	Tesla recalls 130,000 EVs for touch screen malfunctions	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/71f1578d-b5d4-488c-f66f-45020ed8d700/public	business	2025-10-24 02:43:30.843239	Aljezeera	[{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Tesla is recalling about 130,000 vehicles across its United States model lineup because their touch screens can overheat and go blank."}],"id":"77xQwauDOV"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"The recalls covers certain Model S sedan and Model X SUVs from 2021 and 2022, as well as Model 3 cars and Model Y SUVs from 2022."}],"id":"_kbunoH2dN"},{"type":"p","lineHeight":"1.5","align":"left","id":"uQZbpKVcYo","children":[{"text":"Documents posted Tuesday by the National Highway Traffic Safety Administration (NHTSA) say that during the fast-charging process, the central processing computers may not cool sufficiently. That can cause the computer to lag or restart, making the centre screen run slowly or appear blank."}]},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Without the centre screen, the cars can lose rearview camera displays, settings that control windshield defrosters and indicators that say whether the cars are in drive, neutral or reverse. That can increase the risk of a crash."}],"id":"N5xfbhH5TK"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Tesla is fixing the problem with online software updates that will improve temperature management for the computer. Updates began on May 3."}],"id":"pYNjvl7t4h"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Tesla says that it found the problem in routine endurance testing. The company has no reports of crashes or injuries, but it received 59 related warranty claims from January to early May."}],"id":"1c4eu1GK6x"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Tesla has had a spate of safety problems this year, including multiple investigations opened by NHTSA, the nation’s road safety watchdog. The recall is the 11th for the electric vehicle (EV) company since January 27. Most recalls were fixed with software updates."}],"id":"sNMokbszKs"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Early in 2021 the Austin, Texas, company recalled about 135,000 vehicles, also because the touch screens could go dark. Initially, the company had refused to do a recall. The agency said the screens’ computer processors have a finite number of programme-and-erase cycles and didn’t last long enough. The company agreed to replace the computer processors."}],"id":"AQBuKFW12T"}]	{cars,wealth,founder,company}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
76	Microsoft becomes second company to surpass $4 trillion in market value	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/0e1faf51-12c6-449f-1787-f995c0e2d900/public	business	2025-10-24 03:01:59.274467	bloomberg	[{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Microsoft is now the second company ever to surpass $4 trillion in market valuation, following artificial intelligence giant Nvidia."}],"id":"VDcP2VPjQO"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Microsoft, which is traded under the ticker “MSFT”, is continuing to surge and as of noon in New York City (16:00 GMT) on Thursday, it is up 4.6 percent from the market open."}],"id":"8LFeXfXwSR"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Redmond, Washington-headquartered Microsoft first cracked the $1 trillion mark in April 2019."}],"id":"gfqY1v856I"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Its move to $3 trillion was more measured than that of technology giants Nvidia and Apple, with AI-bellwether Nvidia tripling its value in just about a year and clinching the $4 trillion milestone before any other company on July 9."}],"id":"6ouNWfQtqr"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"In its earnings report, revenue topped $76.4bn."}],"id":"UARGSyvDS9"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Microsoft’s multibillion-dollar bet on OpenAI is proving to be a game-changer, powering its Office Suite and Azure offerings with cutting-edge AI and fuelling the stock to more than double its value since ChatGPT’s late-2022 debut."}],"id":"Igrxd0v08G"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Its capital expenditure forecast, its largest ever for a single quarter, has put it on track to potentially outspend its rivals over the next year."}],"id":"eZNb0-Zb5w"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"However, Microsoft’s surge in market value is overshadowed by a wave of layoffs at the tech giant. Earlier this month, the company laid off 9,000 people, representing 4 percent of its global workforce, while doubling down on AI."}],"id":"-hl4uJWjhl"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Lately, breakthroughs in trade talks between the United States and its trading partners ahead of US President Donald Trump’s August 1 tariff deadline have buoyed stocks, propelling the S&P 500 and the Nasdaq to record highs."}],"id":"UWaOMfpw1h"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"Meta Platforms also doubled down on its AI ambitions, forecasting third-quarter revenue that blew past Wall Street estimates as artificial intelligence supercharged its core advertising business."}],"id":"ZvfuGzVZsr"},{"type":"p","lineHeight":"1.5","align":"left","children":[{"text":"The social media giant upped the lower end of its annual capital spending by $2bn – just days after Alphabet made a similar move – signalling that Silicon Valley’s race to dominate the artificial-intelligence frontier is only accelerating."}],"id":"ofyhvzE-Lv"}]	{CEO,wealth,technology}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
77	BlacVolta unveils app, lifestyle card; merging entertainment and fintech in Ghana	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/01ad27a4-3ec0-4253-5e30-58d6e41d2800/public	entertainment	2025-10-24 03:14:17.011316	CitiNews	[{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"BlacVolta, Africa’s largest digital media and entertainment platform, has launched the BlacVolta App and BlacVolta Visa Lifestyle Card on day two of the Africa FinTech Summit at the Accra International Conference Centre."}],"id":"Q9Ov35MjZA"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"The event convened more than 2,000 global fintech leaders, investors, and innovators to explore the future of financial technology on the continent."}],"id":"gC_nVRQZgS"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"Bringing entertainment and payments together in one seamless experience, the BlacVolta App connects users to Ghana’s lifestyle, events, nightlife, and hospitality ecosystem."}],"id":"U1UJmhk5IM"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"Complementing the app, the BlacVolta Visa Lifestyle Card is a premium lifestyle and payment solution powered by Visa, supported by Onafriq and First Atlantic Bank, and developed in partnership with Shrinq."}],"id":"Im_DmYPdqF"},{"type":"p","lineHeight":"inherit","align":"start","id":"6EgX4L02Ij","children":[{"text":"Cardholders enjoy exclusive benefits, including discounts at top venues, express entry, and curated experiences—redefining access and convenience across Africa’s entertainment scene.","fontFamily":"\\"Helvetica Neue\\", Helvetica, Roboto, Arial, sans-serif","fontSize":"16px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(51, 51, 51)"}]},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"The BlacVolta App and BlacVolta Visa Lifestyle Card are now available to users in Ghana—arriving just in time for the “December in Ghana” festive season. Together, they mark a new chapter for Africa’s entertainment ecosystem, powered by innovation, inclusion, and experience."}],"id":"BGEvaf0oLC"},{"type":"p","lineHeight":"inherit","align":"start","children":[{"text":"For more information or partnership inquiries, visit www.blacvolta.com or follow blacvolta across all social platforms."}],"id":"8uM4Qa2_Gt"}]	{"Ghana News",App,Fintec}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
78	Isla Fisher Says She Is 'Really, Really, Really Shocked' by Nicole Kidman and Keith Urban’s Divorce	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/8a372e53-9c88-4164-c919-8e53f07c1900/newsafrika	entertainment	2025-10-24 03:31:55.213738	People.com	[{"type":"p","lineHeight":"27px","align":"start","children":[{"text":""},{"target":"_blank","type":"a","url":"https://people.com/tag/isla-fisher/","children":[{"text":"Isla Fisher"}],"id":"GHU-PfOlZW"},{"text":" is sharing she was surprised to hear the news of "},{"target":"_blank","type":"a","url":"https://people.com/tag/nicole-kidman/","children":[{"text":"Nicole Kidman"}],"id":"RcA739Q7Mv"},{"text":" and "},{"target":"_blank","type":"a","url":"https://people.com/tag/keith-urban/","children":[{"text":"Keith Urban"}],"id":"3viL3Wa7mt"},{"text":"’s divorce. "}],"id":"rhRRK9lt9Q"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"In the Thursday, Oct. 23 episode of the "},{"target":"_blank","type":"a","url":"https://www.audacy.com/podcast/REDACTED_TOKEN/episodes/REDACTED_TOKEN","children":[{"text":"Fly on the Wall with Dana Carvey and David Spade","italic":true}],"id":"daekZB7EOi"},{"text":" podcast, the 49-year-old "},{"text":"Now You See Me: Now You Don't ","italic":true},{"text":"star opened up about her reaction to the longtime couple’s split. "}],"id":"X-rDV-D9V-"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"The episode, titled “Isla Fisher Has The Best Friend Group,” began with Fisher joking with Spade, 61, about an awkward text exchange he previously had with one of her friends about a date. "}],"id":"nf2yfa4OjG"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"Fisher continued, “I have left a message, I have not connected yet, but I don't really wanna comment on that because there are children involved.”"}],"id":"57DgYDG4tO"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"Kidman and the country star, 57, married in June 2006 and share daughters "},{"target":"_blank","type":"a","url":"https://people.com/parents/all-about-nicole-kidman-children/","children":[{"text":"Sunday Rose, 17, and Faith Margaret, 14"}],"id":"OAAI1yDQKk"},{"text":". The "},{"text":"Perfect Couple","italic":true},{"text":" actress was previously married to Tom Cruise."}],"id":"QsOtEd_rh2"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"Kidman has "},{"target":"_blank","type":"a","url":"https://people.com/REDACTED_TOKEN","children":[{"text":"asked to be the primary residential parent in the custody agreement"}],"id":"OB1Zk27umx"},{"text":" as part of the divorce filing."}],"id":"jlcAu8YszA"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"Her separation from Urban after 19 years of marriage was confirmed by PEOPLE on Sept. 29."}],"id":"EXOQALZ5ZD"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"However, the "},{"text":"Babygirl","italic":true},{"text":" star has been focusing on the good in her life since their split. "}],"id":"O3gzTsd_K6"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"After a trip to Europe, the Oscar winner is “surrounded by the two things that matter the most to her, her family and her work,” a source told PEOPLE."}],"id":"CTb2ESjQvE"}]	{celebrity,divorce}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
79	Martha Stewart Says Her Fall Top Is Great for ‘Any Time and Any Place’ — and Shoppers Are Buying Multiple Colors	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/1f1f9eab-2d1a-4526-b4ed-0d0b35c1c900/newsafrika	entertainment	2025-10-24 03:40:28.118016	people.com	[{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"Taking fashion cues from "},{"target":"_blank","type":"a","url":"https://people.com/REDACTED_TOKEN","children":[{"text":"Martha Stewart"}],"id":"RzBcEg3cR6"},{"text":" is always a good idea — and that holds especially true when it comes to finding "},{"target":"_blank","type":"a","url":"https://people.com/quince-fall-sweaters-2025-11830599","children":[{"text":"polished pieces"}],"id":"M-vR19S925"},{"text":" that don’t sacrifice comfort. "}],"id":"SATJeIDCgG"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"The lifestyle mogul’s signature "},{"target":"_blank","type":"a","url":"https://qvc.uikc.net/K07W2N?subId1=REDACTED_TOKEN","children":[{"text":"fashion collection"}],"id":"Xank_u6Rqj"},{"text":" at "},{"target":"_blank","type":"a","url":"https://qvc.uikc.net/yqYBE3?subId1=REDACTED_TOKEN","children":[{"text":"QVC"}],"id":"3or8UHiSiZ"},{"text":" is brimming with clothing that bridges this gap, and the "},{"target":"_blank","type":"a","url":"https://qvc.uikc.net/zxYBXr?subId1=REDACTED_TOKEN","children":[{"text":"Comfort Stretch Boxy Modern Top"}],"id":"dn6gHA_-i4"},{"text":" is the latest example. The pullover is a lightweight, versatile, and casual item that Stewart said can be worn “for any time and any place” in a QVC segment. Snag this piece in four fall-ready colors today."}],"id":"1N3ybakEEJ"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"The knit layer is made from a slightly stretchy material that is comfortable enough to wear while relaxing at home, but the boxy design adds structure that bodes well for brunch plans or running errands. One shopper who purchased this top in multiple colors said they like that the fabric is “substantial without being too heavy,” and another customer called it “very smooth and soft.” "}],"id":"VOc-lgAD7E"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"Whether you’re looking to add neutral shades or a pop of color to your wardrobe, this piece is an ideal pick. The fall color palette includes champagne, dark brown, navy blue, and burnt orange, and Stewart shared that the “versatile” style makes it “easy to wear.” Plus, the top is machine washable and can be tumble dried for easy maintenance, so you can wear it all season on repeat. It comes in sizes ranging from XXS to 5X. "}],"id":"UEvg-gHxb1"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"The laid-back style is achieved with raglan sleeves and a relaxed silhouette, which makes this a great piece to wear with both jeans and leggings, depending on the occasion. You can also pair it with the brand’s "},{"target":"_blank","type":"a","url":"https://qvc.uikc.net/PO7WxN?subId1=REDACTED_TOKEN","children":[{"text":"sweatpants"}],"id":"WRigN_ixtd"},{"text":" in coordinating colors for a matching set. "}],"id":"uBL10AAPDe"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"If past collections are any indication, this fall-ready layer won’t be in stock for long. Follow fellow shoppers’ leads and snag this piece in multiple shades for fall and winter. "}],"id":"G4EaK6Xn5m"},{"type":"p","lineHeight":"27px","align":"start","children":[{"text":"Keep scrolling to shop more pieces from the "},{"target":"_blank","type":"a","url":"https://qvc.uikc.net/K07W2N?subId1=REDACTED_TOKEN","children":[{"text":"Martha Stewart Signature"}],"id":"ObzSBCDwhd"},{"text":" collection at QVC. "}],"id":"jehCd6Jlxv"}]	{celebrity,women,clothes,fashion}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
80	Patoranking returns to his Galala roots with new single, ‘No Jonze’	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/bd6f1a91-125d-41cf-a38c-4e8540348600/public	culture	2025-10-24 03:45:14.039778	JoyNews	[{"children":[{"text":"Nigerian superstar Patoranking is back with 'No Jonze', a street-rooted, festival-friendly single and the lead track from his forthcoming fifth studio album.","fontFamily":"\\"Work Sans\\", sans-serif","fontSize":"16px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(33, 37, 41)"}],"type":"p","id":"AEcvLpG_l7"},{"type":"p","align":"left","children":[{"text":"'No Jonze' blends late 1990s and early 2000s Galala energy with modern Afro-dancehall."}],"id":"ovSz5UZkaO"},{"type":"p","align":"left","children":[{"text":"The title borrows Lagos street slang and turns it into a mantra that urges grind and focus, a reminder to underdogs to hold their ground and not fumble opportunity."}],"id":"xDS1QUII1C"},{"type":"p","align":"left","id":"mYcKyFBzfI","children":[{"text":"The record nods to the raw, communal feel of the genre while positioning Lagos street culture in a wider global conversation about contemporary Afrobeats and dancehall influences.","fontFamily":"\\"Work Sans\\", sans-serif","fontSize":"16px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(33, 37, 41)"}]},{"type":"p","align":"left","children":[{"text":"The official video was shot in Ajegunle and directed by Director K, who has worked with artists such as Rema, Wizkid, and Davido."}],"id":"rlJt_MgENo"},{"type":"p","align":"left","children":[{"text":"Patoranking shares the screen with Galala figures Marvelous Benjy and Allen B."}],"id":"BZwt2XR0h8"}]	{music,fashion}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
81	‘Mastering leadership, principles, practices and lessons’ now available for pre-order	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/827dbb76-02d5-4c8d-b58b-405042bd7d00/newsafrika	culture	2025-10-24 03:51:15.159767	JoyNews	[{"children":[{"text":"A landmark publication offering profound insights into transformative governance and dedicated service has been announced today.","fontFamily":"\\"Work Sans\\", sans-serif","fontSize":"16px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(33, 37, 41)"}],"type":"p","id":"uh2sjnUmJI"},{"type":"p","align":"left","children":[{"text":"\\"Mastering Leadership, Principles, Practices and Lessons,\\" a compelling new book, has been released and is now available for pre-order, promising to be an essential resource for students, policymakers, and future leaders worldwide."}],"id":"nr8qzF32rX"},{"type":"p","align":"left","children":[{"text":"The book distils critical principles and practical lessons from decades of service, providing a candid and comprehensive look at the foundation required to build and sustain "},{"text":"ethical, people-centred leadership.","fontFamily":"\\"Work Sans\\", sans-serif","fontSize":"16px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(33, 37, 41)"}],"id":"B1WhvJWXa0"},{"type":"p","align":"left","children":[{"text":"This highly anticipated work is the result of a powerful collaboration between two giants in their respective fields."}],"id":"uSF1sId-c4"},{"type":"p","align":"left","children":[{"text":"Sir Samuel Jonah, a renowned statesman and influential business leader, contributes decades of strategic vision and executive experience in both the private sector and nation-building."}],"id":"Vy-dXPBZcH"},{"type":"p","align":"left","children":[{"text":"Equally vital is the contribution of Professor Pikay Richardson, a distinguished academic specialising in governance and public policy, who provides the rigorous analytical frameworks and theoretical depth that ground the book’s practical lessons."}],"id":"T0zgp-UB2M"},{"type":"p","align":"left","children":[{"text":"Together, their complementary expertise offers a comprehensive and balanced perspective expected to influence leadership discourse globally."}],"id":"wC9hmHuVKt"}]	{reading,book,launch}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
82	Sam George engages TikTok to boost Ghana’s creative industry	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/6a432e4d-0e4d-49c1-2bbf-f94f0baf5c00/public	culture	2025-10-24 03:55:50.635363	JoyNews	[{"children":[{"text":"Minister for Communication, Digital Technology and Innovations, Samuel Nartey George, says his ministry has begun fulfilling its promise to create a more enabling environment for Ghana’s creative community through strategic partnerships with global technology platforms.","fontFamily":"\\"Work Sans\\", sans-serif","fontSize":"16px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(33, 37, 41)"}],"type":"p","id":"-36KYBMR8q"},{"type":"p","id":"l2pQ8KjSED","children":[{"fontFamily":"\\"Work Sans\\", sans-serif","fontSize":"16px","backgroundColor":"rgb(255, 255, 255)","color":"rgb(33, 37, 41)","text":"In a Facebook post on Wednesday, October 15, Sam George described the initiative as part of efforts to harness digital tools for national development and empower local creators to thrive in the digital economy."}]},{"type":"p","align":"left","children":[{"text":"According to him, the ministry held a successful engagement with representatives of TikTok to explore ways of supporting Ghanaian creatives and enhancing their productivity through digital collaboration."}],"id":"hNu9txuP-B"},{"type":"blockquote","children":[{"type":"p","children":[{"text":"“Yesterday was a very successful day in my service as Minister for Communication, Digital Technology and Innovations. We saw the fulfilment of a promise to create a more enabling environment for creatives in Ghana by using the agency of government to collaborate with big tech platforms,” he wrote."}],"id":"oLcNvYCeyw"}],"id":"0Hrr6JI2AP"},{"children":[{"text":""}],"type":"p","id":"ypM_ngRSRe"}]	{app,engagement}	{https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/ac959831-d5f2-4c3d-145c-7dec37affe00/public}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
84	Alaska Airlines restores operations after tech outage grounds flights	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/a3e1dd72-ef49-409e-a1fb-3bfa80ab6900/newsafrika	technology	2025-10-24 04:08:14.83983	Honolulu Star	[{"children":[{"text":"Oct 24 (Reuters) - U.S. carrier Alaska Airlines ","fontFamily":"knowledge-regular, Arial, sans-serif","fontSize":"medium","color":"rgb(64, 64, 64)"},{"target":"_blank","type":"a","url":"https://www.reuters.com/markets/companies/ALK.N","children":[{"text":"(ALK.N), opens new tab","fontFamily":"knowledge-regular, Arial, sans-serif","fontSize":"medium","color":"rgb(64, 64, 64)"}],"id":"BxqiRwUoNR"},{"text":" said early on Friday it had restored operations following a technology outage that grounded flights across all airports and led to the cancellation of more than 229 flights.\\"We are working to get our operations back on track as quickly and safely as possible,\\" the airline said, adding that further flight disruptions were likely.","fontFamily":"knowledge-regular, Arial, sans-serif","fontSize":"medium","color":"rgb(64, 64, 64)"}],"type":"p","id":"TuuDLOtVaj"},{"type":"p","id":"hX5zwG-kuz","children":[{"text":"Alaska Air Group said it does not yet have an estimate of the financial impact the disruption may have on its fourth-quarter results.","fontFamily":"knowledge-regular, Arial, sans-serif","fontSize":"16px","color":"rgb(64, 64, 64)"}]},{"type":"p","id":"HLg-_8xj-y","children":[{"text":"It requested a temporary ground stop on Thursday evening, which also affected Horizon Air, a subsidiary of Alaska Airlines, according to a Federal Aviation Administration advisory.The airlines said the halt was lifted at 11:30 p.m. local time (0630 GMT) on Friday.Alaska Airlines did not disclose the cause of the outage.The airline also addressed customer complaints on social media, responding to posts about booking glitches on its website and questions over whether its app was affected too.\\"Unfortunately, we are experiencing an error on our system, but our IT team is working to get this resolved as soon as possible,\\" it said on X to user queries.","fontFamily":"knowledge-regular, Arial, sans-serif","fontSize":"medium","color":"rgb(64, 64, 64)"}]},{"type":"p","id":"c0rHPhtrtm","children":[{"fontFamily":"knowledge-regular, Arial, sans-serif","fontSize":"medium","color":"rgb(64, 64, 64)","text":"Alaska Air Group reported third-quarter revenue of $3.77 billion after markets closed on Thursday, marking a 23% increase from a year earlier.The company said it postponed its earnings call, originally scheduled for October 24, to allow teams to prioritize guest support and operational recovery.The airline also "},{"target":"_blank","type":"a","url":"https://www.reuters.com/world/us/REDACTED_TOKEN/","children":[{"text":"grounded","fontFamily":"knowledge-regular, Arial, sans-serif","fontSize":"medium","color":"rgb(64, 64, 64)"}],"id":"XnBhbkGR2W"},{"text":" all of its flights in July for about three hours due to an IT outage.","fontFamily":"knowledge-regular, Arial, sans-serif","fontSize":"medium","color":"rgb(64, 64, 64)"}]}]	{airline,airport,outage}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
85	Apple unveils new 14‑inch MacBook Pro powered by the M5 chip, delivering the next big leap in AI for the Mac	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/2679159f-568e-4cd0-f6e0-fcde2b012800/public	technology	2025-10-24 04:12:53.357079	apple.com	[{"children":[{"text":"With up to 3.5x more performance for AI workflows, faster storage, up to a phenomenal 24 hours of battery life, and macOS Tahoe, the 14-inch MacBook Pro gets even better"}],"type":"p","id":"yQU8t0uukN"},{"children":[{"text":"CUPERTINO, CALIFORNIA Apple today unveiled a new 14-inch MacBook Pro, featuring the incredibly powerful M5 chip. With M5, the 14-inch MacBook Pro gets even faster, more capable, and delivers a huge leap in AI performance. The M5 chip features a next-generation GPU with a Neural Accelerator in each core, delivering up to 3.5x the AI performance1 and up to 1.6x faster graphics2 than the previous generation. M5 also includes a faster and more efficient CPU, an enhanced Neural Engine, and higher memory bandwidth that accelerates everything from launching apps to running large language models (LLMs) on device. Additionally, it offers phenomenal battery life of up to 24 hours, so users can take their pro workflows anywhere.1 With the latest storage technology, the new 14-inch MacBook Pro with M5 brings faster SSD performance than the previous generation for tasks like importing RAW image files or exporting large videos.2 Renowned features — including a gorgeous Liquid Retina XDR display with a nano-texture option, a 12MP Center Stage camera, a six-speaker sound system, a wide array of ports, Apple Intelligence capabilities, and the unrivaled power of macOS Tahoe — complete the MacBook Pro experience. Altogether, the 14-inch MacBook Pro with M5 delivers an industry-leading combination of capabilities for the same starting price of $1,599 — making it an even better value and upgrade for current and new Mac users. Available in space black and silver, the new 14-inch MacBook Pro with M5 is available to pre-order today, with availability beginning Wednesday, October 22.\\n“MacBook Pro continues to be the world’s best pro laptop, and today, the 14-inch MacBook Pro gets even better with the arrival of the M5 chip,” said John Ternus, Apple’s senior vice president of Hardware Engineering. “M5 marks the next big leap in AI for the Mac and delivers a huge boost in graphics performance, accelerating demanding workflows for everyone from students to creatives, developers to business professionals, and more. With its amazing performan"}],"type":"p","id":"7IO8XZOwg2"}]	{Ai,Wealth,tech,innovation}	{}	Yakubu Zakaria	c05281fe-7615-4d3b-9348-fe938d0aa673	0
\.


--
-- Data for Name: authenticator; Type: TABLE DATA; Schema: public; Owner: jacobzakaria
--

COPY public.authenticator ("credentialID", "userId", "providerAccountId", "credentialPublicKey", counter, "credentialDeviceType", "credentialBackedUp", transports) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: jacobzakaria
--

COPY public.comments (id, comment, post_id, owner_id, date) FROM stdin;
\.


--
-- Data for Name: readlist; Type: TABLE DATA; Schema: public; Owner: jacobzakaria
--

COPY public.readlist (id, "articleId", owner_id) FROM stdin;
\.


--
-- Data for Name: replies; Type: TABLE DATA; Schema: public; Owner: jacobzakaria
--

COPY public.replies (id, reply, comment_id, owner_id) FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: jacobzakaria
--

COPY public.session ("sessionToken", "userId", expires) FROM stdin;
211c6cf9-e88c-4ec9-bf50-a1ee4508aae9	c05281fe-7615-4d3b-9348-fe938d0aa673	2025-11-25 05:58:46.117
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: jacobzakaria
--

COPY public.users (id, name, email, "emailVerified", "isAdmin", image) FROM stdin;
c05281fe-7615-4d3b-9348-fe938d0aa673	Yakubu Zakaria	zakjak456@gmail.com	\N	t	https://imagedelivery.net/zHlSnsQPlqOBliXetcpyAQ/d1bdc093-7631-4660-fdfb-067c03f04500/public
\.


--
-- Data for Name: verificationToken; Type: TABLE DATA; Schema: public; Owner: jacobzakaria
--

COPY public."verificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: jacobzakaria
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 1, false);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jacobzakaria
--

SELECT pg_catalog.setval('public.articles_id_seq', 85, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jacobzakaria
--

SELECT pg_catalog.setval('public.comments_id_seq', 29, true);


--
-- Name: readList_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jacobzakaria
--

SELECT pg_catalog.setval('public."readList_id_seq"', 364, true);


--
-- Name: replies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jacobzakaria
--

SELECT pg_catalog.setval('public.replies_id_seq', 1, false);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: jacobzakaria
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: authenticator authenticator_credentialID_unique; Type: CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.authenticator
    ADD CONSTRAINT "authenticator_credentialID_unique" UNIQUE ("credentialID");


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: readlist readList_pkey; Type: CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.readlist
    ADD CONSTRAINT "readList_pkey" PRIMARY KEY (id);


--
-- Name: replies replies_pkey; Type: CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY ("sessionToken");


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: account account_userId_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: articles articles_owner_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_owner_id_users_id_fk FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- Name: authenticator authenticator_userId_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.authenticator
    ADD CONSTRAINT "authenticator_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments comments_owner_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_owner_id_users_id_fk FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- Name: comments comments_post_id_articles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_articles_id_fk FOREIGN KEY (post_id) REFERENCES public.articles(id);


--
-- Name: readlist readlist_articleId_articles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.readlist
    ADD CONSTRAINT "readlist_articleId_articles_id_fk" FOREIGN KEY ("articleId") REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: readlist readlist_owner_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.readlist
    ADD CONSTRAINT readlist_owner_id_users_id_fk FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- Name: replies replies_comment_id_comments_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_comment_id_comments_id_fk FOREIGN KEY (comment_id) REFERENCES public.comments(id);


--
-- Name: session session_userId_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: jacobzakaria
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

