---
title: "กล่องแชทรวม LINE OA, Messenger และ Instagram"
description: "เชื่อม LINE Official Account, Facebook Messenger และ Instagram เข้ากล่องแชทเดียวใน Tonbab มอบหมายแชทให้ทีม ผูกกับลูกค้า และดูสถานะการส่งข้อความ"
section: commerce
order: 4
updated: 2026-11-17
---

เมนู **แชท** ในคอมเมิร์ซรวมข้อความจาก LINE OA, Facebook Messenger และ Instagram ไว้ในกล่องเดียว ทีมตอบลูกค้าได้จาก Tonbab มอบหมายแชทให้กัน และผูกบทสนทนากับข้อมูลลูกค้าเพื่อเห็นประวัติการซื้อ

## รองรับช่องทางไหนบ้าง

| ช่องทาง | สถานะ |
|---|---|
| LINE Official Account | ใช้งานได้ |
| Facebook Messenger | ใช้งานได้ |
| Instagram Direct | ใช้งานได้ |
| แชท Shopee / Lazada | ยังไม่รองรับ |

การเชื่อมช่องทางขายและแชทรวมอยู่ในแพ็กเกจ Enterprise หรือซื้อเพิ่มสำหรับ Business ดู [แพ็กเกจและค่าบริการ](/th/docs/getting-started/plans-and-billing)

## เชื่อม LINE OA

1. ไปที่ **ตั้งค่าคอมเมิร์ซ** › **ช่องทางการขาย** แล้วเลือก **LINE Official Account**
2. กด **เพิ่มบัญชี**
3. ตั้งชื่อ เลือกแบรนด์ แล้วใส่ข้อมูลจาก LINE Developers Console
   - **Channel secret** จากแท็บ Basic settings
   - **Channel access token** จากแท็บ Messaging API
   - **Bot user ID** (ต้องใส่ถ้ามี LINE OA มากกว่าหนึ่งบัญชี)
4. ติ๊ก **Enable this account** แล้วกด **Save account**
5. คัดลอก **Webhook URL** ที่ Tonbab แสดง ไปวางใน LINE Developers Console

## เชื่อม Facebook และ Instagram

1. ใน **ช่องทางการขาย** เลือก **Meta (Facebook & Instagram)** แล้วกด **เพิ่มเพจ**
2. ใส่ **Facebook Page ID**, **Instagram account ID** (ถ้ามี), **Page access token** และ **App secret**
3. ตั้ง **Webhook verify token** เป็นคำที่คุณเลือกเอง แล้วกด **Save connection**
4. ในแอปของ Meta ใส่ **Webhook Callback URL** ที่ Tonbab แสดง และ verify token เดียวกัน

## แชทเริ่มจากลูกค้าเสมอ

บทสนทนาจะปรากฏเมื่อลูกค้าทักมาก่อน พนักงานเริ่มแชทใหม่เองไม่ได้ เพราะเป็นกฎของแต่ละแพลตฟอร์ม เช่น Meta ให้ตอบได้ภายใน 24 ชั่วโมงหลังลูกค้าส่งข้อความล่าสุด และ LINE ต้องเคยมีการติดต่อกันมาก่อน

## ใช้งานกล่องแชท

- ตัวกรอง **ทั้งหมด**, **มอบหมายให้ฉัน** และแยกตามแบรนด์
- สถานะบทสนทนา: เปิด รอดำเนินการ เลื่อนไว้ และปิด
- **เชื่อมกับลูกค้า** เพื่อผูกแชทกับลูกค้าในระบบ
- **ตอบในแอป LINE แล้ว** ใช้เมื่อตอบลูกค้าจากแอป LINE OA โดยตรง เพราะข้อความที่พิมพ์ในแอป LINE จะไม่ซิงก์กลับมา

## สถานะการส่งข้อความ

ทุกข้อความที่ตอบมีสถานะกำกับ

- **ส่งแล้ว** แพลตฟอร์มรับข้อความแล้ว
- **ส่งไม่สำเร็จ** เช่น เกินกรอบเวลาตอบของ Meta
- ช่องทางที่ยังไม่รองรับการตอบกลับ ระบบจะไม่ส่งและแจ้งให้ทราบ

## ดูข้อมูลลูกค้าจากแชท

เมื่อผูกแชทกับลูกค้าแล้ว ข้อมูลเชิงลึกและประวัติออเดอร์จะแสดงในหน้า [ลูกค้า](/th/docs/commerce/orders-and-customers)
