<?php
require "../../sub-api/phpedb.php";
print '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="sitemap-style.xml"?><urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
$db=new database();
$db->db="db_sarrafchi";
$db->connect("localhost", "root", "dfgdfg@!uL");
$posts=$db->selects("news");
?>
	<url><loc>https://sarrafchi.ir/</loc><lastmod>2020-05-18T11:50:05+04:30</lastmod></url>
	<url><loc>https://sarrafchi.ir/en/</loc><lastmod>2020-05-18T11:50:05+04:30</lastmod></url>
	<url><loc>https://sarrafchi.ir/news/</loc><lastmod>2020-05-18T11:50:05+04:30</lastmod></url>
	<?php foreach($posts as $i=>$post) { ?>
	<url><loc>https://sarrafchi.ir/news/<?= $post["slug"]?>/</loc><lastmod>2020-05-18T11:50:05+04:30</lastmod></url>
	<?php } ?>
</urlset>
