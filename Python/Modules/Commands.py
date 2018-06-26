import random
import discord
from discord.ext import commands
import json


class Global:

    def __init__(self, bot):
        self.bot = bot
        self.load_files()

    async def on_message(self, message):
        # message.channel.parentID
        if not message.author.bot:
            if message.channel.category_id == 456391975630012428 or message.channel.id in self.bot.config["debugChannels"]:
                if str(message.author.id) not in self.bot.sao.keys():
                    await message.channel.send("Hey! I created a profile for you! you didn't seem to have one!")
                    self.bot.sao[message.author.id] = {
                        "playerXp": 0,
                        "playerLevel": 1,
                        "playerHealth": 100,
                        "PlayerMaxHealth": 100,
                        "playerCor": 150,
                        "playerInventory": [],
                        "playerTotalXp": 0,
                        "playerKills": 0,
                        "playerDamage": 10,
                        "enemyCurrent": "none",
                        "enemyCurrentHP": 0,
                        "enemyMaxHP": 0,
                        "enemyDamage": 0
                    }
                    self.save_files()

    def in_sao():
        async def predicate(ctx):
            return ctx.message.channel.category_id == 456391975630012428
        return commands.check(predicate)

    def in_afo():
        async def predicate(ctx):
            return ctx.message.channel.category_id == 456392015412854796
        return commands.check(predicate)

    def in_ggo():
        async def predicate(ctx):
            return ctx.message.channel.category_id == 456413358556577792
        return commands.check(predicate)

    @commands.command()
    async def hi(self, ctx):
        if ctx.author.id == 365452203982323712:
            await ctx.send(random.choice(["Hello mama!", "Hi there mama!", "Hey mama!", "Good day mama!", "Greetings mama!"]))
        elif ctx.author.id == 399494016539820032:
            await ctx.send(random.choice(["Hello papa!", "Hi there papa!", "Hey papa!", "Good day papa!", "Greetings papa!"]))
        else:
            await ctx.send(random.choice(["Hello!", "Hi there!", "Hey!", "Good day :D", "Greetings!"]))

    @commands.command()
    async def copyright(self, ctx):
        await ctx.send(embed=discord.Embed(description="THE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.", color=random.randint(0, 255**3)).set_footer(text="Copyright © 2018 Asuna#3119, All rights reserved", icon_url=(await self.bot.get_user_info(365452203982323712)).avatar_url))

    @commands.command()
    @in_sao()
    async def fight():
        pass

    def load_files(self):
        self.bot.sao = json.load(open(bot.sao_dir, "r+"))
        self.bot.alo = json.load(open(bot.alo_dir, "r+"))
        self.bot.ggo = json.load(open(bot.ggo_dir, "r+"))

    def save_files(self):
        json.dump(self.bot.sao, open(self.bot.sao_dir "w+"))
        json.dump(self.bot.alo, open(self.bot.alo_dir "w+"))
        json.dump(self.bot.ggo, open(self.bot.ggo_dir "w+"))


def setup(bot):
    bot.add_cog(Global(bot))
