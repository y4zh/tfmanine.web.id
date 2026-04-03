<?php
header('Content-Type: application/json');

function fetchRSS($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    if (!$response) return [];
    
    $xml = @simplexml_load_string($response);
    if (!$xml || !isset($xml->channel->item)) return [];
    
    $items = [];
    $count = 0;
    foreach ($xml->channel->item as $item) {
        if ($count >= 5) break;
        
        $text = strip_tags((string)$item->description);
        $pubDate = strtotime((string)$item->pubDate);
        
        date_default_timezone_set('Asia/Jakarta');
        $timeDiff = time() - $pubDate;
        
        if ($timeDiff < 60) {
            $timeStr = "Baru saja";
        } elseif ($timeDiff < 3600) {
            $timeStr = floor($timeDiff / 60) . " Menit lalu";
        } elseif ($timeDiff < 86400) {
            $timeStr = floor($timeDiff / 3600) . " Jam lalu";
        } else {
            $timeStr = date('d M Y', $pubDate);
        }
        
        $items[] = [
            "time" => $timeStr,
            "text" => trim(preg_replace('/\s+/', ' ', $text)),
            "url" => (string)$item->link
        ];
        $count++;
    }
    return $items;
}

$data = [
    "TJ" => fetchRSS("https://rsshub.app/twitter/user/PT_Transjakarta"),
    "KRL" => fetchRSS("https://rsshub.app/twitter/user/CommuterLine"),
    "LRT" => fetchRSS("https://rsshub.app/twitter/user/lrtjabodebek")
];

$dir = __DIR__ . '/assets/data';
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

$jsonFile = $dir . '/live-update.json';
file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));

echo json_encode(["status" => "success", "file" => $jsonFile]);
?>
